"""
Generate atmospheric scene images for Ombres & Vérités
Each scene gets a unique procedural image with mood lighting
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import random
import math
import os

OUTPUT_DIR = r'c:\Users\Souso\OneDrive\Documents\Game\images\scenes'
W, H = 800, 500

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def draw_gradient(draw, w, h, color_top, color_bot):
    for y in range(h):
        r = int(color_top[0] + (color_bot[0]-color_top[0]) * y/h)
        g = int(color_top[1] + (color_bot[1]-color_top[1]) * y/h)
        b = int(color_top[2] + (color_bot[2]-color_top[2]) * y/h)
        draw.line([(0, y), (w, y)], fill=(r, g, b))

def draw_stars(draw, w, h, count=60):
    for _ in range(count):
        x, y = random.randint(0, w), random.randint(0, int(h*0.5))
        s = random.randint(1, 3)
        bright = random.randint(150, 255)
        draw.ellipse([x-s, y-s, x+s, y+s], fill=(bright, bright, bright+5))

def draw_moon(draw, x, y, r):
    draw.ellipse([x-r, y-r, x+r, y+r], fill=(240, 235, 200))
    # Glow
    for i in range(5):
        gr = r + i*8
        alpha = 40 - i*8
        draw.ellipse([x-gr, y-gr, x+gr, y+gr], outline=(240, 235, 200, alpha))

def draw_window(draw, x, y, w, h, glow_color=(180, 200, 240)):
    # Frame
    draw.rectangle([x, y, x+w, y+h], fill=glow_color, outline=(60, 50, 40), width=3)
    # Cross bars
    cx, cy = x+w//2, y+h//2
    draw.line([(cx, y), (cx, y+h)], fill=(60, 50, 40), width=3)
    draw.line([(x, cy), (x+w, cy)], fill=(60, 50, 40), width=3)

def draw_pillar(draw, x, y, w, h, color=(50, 45, 40)):
    draw.rectangle([x, y, x+w, y+h], fill=color)
    # Capital
    draw.rectangle([x-4, y, x+w+4, y+12], fill=(60, 55, 50))
    # Base
    draw.rectangle([x-4, y+h-8, x+w+4, y+h], fill=(60, 55, 50))

def draw_tree(draw, x, y, canopy_r, trunk_h):
    # Trunk
    tw = canopy_r // 3
    draw.rectangle([x-tw//2, y, x+tw//2, y+trunk_h], fill=(40, 30, 20))
    # Canopy
    cy = y - canopy_r//2
    draw.ellipse([x-canopy_r, cy-canopy_r, x+canopy_r, cy+canopy_r], fill=(20, 50, 25))
    # Darker overlay
    draw.ellipse([x-canopy_r+10, cy-canopy_r+10, x+canopy_r-10, cy+canopy_r-10], fill=(15, 40, 20))

def draw_floor(draw, w, h, floor_y, color=(25, 22, 35)):
    draw.rectangle([0, floor_y, w, h], fill=color)
    # Perspective lines
    for i in range(12):
        x = i * w // 11
        draw.line([(w//2, floor_y), (x, h)], fill=(color[0]+8, color[1]+8, color[2]+8), width=1)

def draw_bookshelf(draw, x, y, w, h):
    draw.rectangle([x, y, x+w, y+h], fill=(55, 35, 20), outline=(40, 25, 15), width=2)
    # Shelves
    sh = h // 4
    for i in range(1, 4):
        sy = y + i*sh
        draw.line([(x, sy), (x+w, sy)], fill=(40, 25, 15), width=2)
        # Books
        bx = x + 5
        while bx < x+w-8:
            bw = random.randint(6, 14)
            bh = sh - 8
            colors = [(140,30,30),(30,60,140),(50,100,50),(130,100,30),(80,30,80),(30,80,100)]
            c = random.choice(colors)
            draw.rectangle([bx, sy-bh, bx+bw, sy-2], fill=c)
            bx += bw + 2

def draw_chandelier(draw, x, y, w):
    # Chain
    draw.line([(x, 0), (x, y)], fill=(150, 130, 80), width=2)
    # Frame
    draw.line([(x-w//2, y), (x+w//2, y)], fill=(150, 130, 80), width=3)
    # Candles
    for i in range(5):
        cx = x - w//2 + i*(w//4)
        draw.rectangle([cx-2, y-15, cx+2, y], fill=(200, 180, 120))
        # Flame
        draw.ellipse([cx-4, y-25, cx+4, y-15], fill=(255, 200, 50))
        draw.ellipse([cx-2, y-22, cx+2, y-17], fill=(255, 255, 150))

def add_vignette(img, strength=0.7):
    """Add dark vignette around edges"""
    w, h = img.size
    vig = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(vig)
    for i in range(40):
        alpha = int(strength * 255 * (1 - i/40))
        # Top
        draw.rectangle([0, i, w, i+1], fill=(0, 0, 0, alpha))
        # Bottom
        draw.rectangle([0, h-i-1, w, h-i], fill=(0, 0, 0, alpha))
        # Left
        draw.rectangle([i, 0, i+1, h], fill=(0, 0, 0, alpha))
        # Right
        draw.rectangle([w-i-1, 0, w-i, h], fill=(0, 0, 0, alpha))
    return Image.alpha_composite(img.convert('RGBA'), vig)

def add_label(img, text, subtitle=""):
    """Add location name at bottom"""
    draw = ImageDraw.Draw(img)
    w, h = img.size
    try:
        font = ImageFont.truetype('arial.ttf', 20)
        font_small = ImageFont.truetype('arial.ttf', 14)
    except:
        font = ImageFont.load_default()
        font_small = font
    
    # Semi-transparent bar at bottom
    bar_h = 50 if subtitle else 36
    overlay = Image.new('RGBA', (w, bar_h), (0, 0, 0, 140))
    img.paste(Image.alpha_composite(Image.new('RGBA', (w, bar_h), (0,0,0,0)), overlay), (0, h-bar_h))
    
    draw = ImageDraw.Draw(img)
    # Title
    bbox = draw.textbbox((0,0), text, font=font)
    tw = bbox[2]-bbox[0]
    ty = h - bar_h + 6
    draw.text(((w-tw)//2, ty), text, fill=(212, 168, 67), font=font)
    
    if subtitle:
        bbox2 = draw.textbbox((0,0), subtitle, font=font_small)
        tw2 = bbox2[2]-bbox2[0]
        draw.text(((w-tw2)//2, ty+24), subtitle, fill=(180, 180, 180), font=font_small)
    
    return img


# ========== SCENE GENERATORS ==========

def gen_mansion_entrance():
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)
    # Night sky
    draw_gradient(draw, W, H, (5, 5, 20), (15, 15, 35))
    draw_stars(draw, W, H, 80)
    draw_moon(draw, W-100, 60, 25)
    
    # Ground
    draw.rectangle([0, H*0.7, W, H], fill=(20, 25, 15))
    # Path
    draw.polygon([(W*0.35, H), (W*0.65, H), (W*0.55, H*0.7), (W*0.45, H*0.7)], fill=(45, 40, 35))
    
    # Mansion silhouette
    my = int(H*0.2)
    draw.rectangle([W*0.2, my, W*0.8, H*0.7], fill=(30, 25, 25))
    # Roof
    draw.polygon([(W*0.15, my), (W*0.5, my-80), (W*0.85, my)], fill=(25, 20, 20))
    # Tower
    draw.rectangle([W*0.65, my-60, W*0.78, my], fill=(28, 23, 23))
    draw.polygon([(W*0.63, my-60), (W*0.715, my-100), (W*0.80, my-60)], fill=(22, 18, 18))
    
    # Windows (glowing)
    windows = [(0.3, 0.35), (0.45, 0.35), (0.6, 0.35), (0.3, 0.5), (0.45, 0.5), (0.6, 0.5)]
    for wx, wy in windows:
        gx, gy = int(W*wx), int(H*wy)
        glow = random.choice([(180, 160, 80), (160, 140, 70), (200, 170, 90)])
        draw_window(draw, gx, gy, 40, 50, glow)
    
    # Door
    draw.rectangle([W*0.44, H*0.5, W*0.56, H*0.7], fill=(50, 35, 25), outline=(70, 50, 30), width=3)
    draw.ellipse([W*0.53, H*0.58, W*0.55, H*0.61], fill=(180, 150, 60))
    
    # Trees
    draw_tree(draw, int(W*0.08), int(H*0.35), 60, 120)
    draw_tree(draw, int(W*0.92), int(H*0.3), 70, 140)
    
    # Fog at base
    for i in range(8):
        fy = int(H*0.65 + i*5)
        alpha = 30 - i*3
        draw.rectangle([0, fy, W, fy+8], fill=(100, 100, 120, max(alpha, 5)))
    
    img = add_vignette(img, 0.8)
    return add_label(img, "Entrée du Manoir", "Manoir Beaumont")

def gen_living_room():
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)
    draw_gradient(draw, W, H, (35, 28, 25), (20, 15, 15))
    
    floor_y = int(H*0.65)
    draw_floor(draw, W, H, floor_y, (30, 22, 18))
    
    # Wallpaper pattern
    for y in range(0, floor_y, 30):
        for x in range(0, W, 40):
            draw.rectangle([x+15, y+10, x+25, y+20], fill=(38, 32, 28))
    
    # Fireplace
    fx = int(W*0.4)
    draw.rectangle([fx, floor_y-140, fx+160, floor_y], fill=(60, 45, 35), outline=(50, 38, 28), width=3)
    draw.rectangle([fx+20, floor_y-100, fx+140, floor_y-10], fill=(15, 10, 8))
    # Fire
    for i in range(8):
        fc = random.randint(200, 255)
        fsize = random.randint(8, 20)
        ffx = fx + 40 + random.randint(0, 80)
        ffy = floor_y - 30 - random.randint(0, 60)
        draw.ellipse([ffx-fsize, ffy-fsize, ffx+fsize, ffy+fsize], fill=(fc, fc//2, 20))
    
    # Mantelpiece
    draw.rectangle([fx-20, floor_y-150, fx+180, floor_y-140], fill=(50, 40, 30))
    
    # Sofa
    draw.rounded_rectangle([int(W*0.05), floor_y-60, int(W*0.35), floor_y], radius=8, fill=(80, 30, 30))
    draw.rounded_rectangle([int(W*0.05), floor_y-80, int(W*0.10), floor_y-20], radius=5, fill=(70, 25, 25))
    draw.rounded_rectangle([int(W*0.30), floor_y-80, int(W*0.35), floor_y-20], radius=5, fill=(70, 25, 25))
    
    # Paintings
    draw.rectangle([int(W*0.15), 40, int(W*0.30), 130], fill=(60, 50, 40), outline=(90, 70, 40), width=3)
    draw.rectangle([int(W*0.65), 50, int(W*0.85), 150], fill=(50, 45, 38), outline=(90, 70, 40), width=3)
    
    draw_chandelier(draw, W//2, 20, 100)
    
    img = add_vignette(img, 0.6)
    return add_label(img, "Le Salon", "Atmosphère feutrée")

def gen_study():
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)
    draw_gradient(draw, W, H, (25, 25, 38), (15, 12, 20))
    
    floor_y = int(H*0.65)
    draw_floor(draw, W, H, floor_y, (22, 18, 28))
    
    # Bookshelves
    draw_bookshelf(draw, 10, 30, int(W*0.22), floor_y-40)
    draw_bookshelf(draw, W-int(W*0.22)-10, 30, int(W*0.22), floor_y-40)
    
    # Desk
    draw.rectangle([int(W*0.3), floor_y-50, int(W*0.7), floor_y-10], fill=(55, 35, 20), outline=(45, 28, 15), width=2)
    # Desk legs
    draw.rectangle([int(W*0.32), floor_y-10, int(W*0.34), floor_y], fill=(50, 30, 18))
    draw.rectangle([int(W*0.66), floor_y-10, int(W*0.68), floor_y], fill=(50, 30, 18))
    
    # Desk lamp (glow)
    lx = int(W*0.6)
    draw.polygon([(lx, floor_y-80), (lx-20, floor_y-50), (lx+20, floor_y-50)], fill=(40, 80, 40))
    # Lamp glow
    for i in range(6):
        alpha = 30 - i*5
        r = 40 + i*15
        draw.ellipse([lx-r, floor_y-80-r//2, lx+r, floor_y-50+r//3], fill=(200, 180, 80, max(alpha, 5)))
    
    # Papers on desk
    for _ in range(4):
        px = int(W*0.35) + random.randint(0, int(W*0.25))
        py = floor_y - 45 + random.randint(0, 20)
        draw.rectangle([px, py, px+30, py+40], fill=(200, 190, 170))
    
    # Chair
    draw.rounded_rectangle([int(W*0.42), floor_y-30, int(W*0.58), floor_y+30], radius=5, fill=(60, 30, 20))
    
    # Window
    draw_window(draw, int(W*0.4), 20, 80, 100, (40, 50, 80))
    
    img = add_vignette(img, 0.7)
    return add_label(img, "Le Bureau", "Secrets enfouis")

def gen_kitchen():
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)
    draw_gradient(draw, W, H, (30, 30, 35), (20, 18, 22))
    
    floor_y = int(H*0.65)
    # Tiled floor
    draw.rectangle([0, floor_y, W, H], fill=(35, 32, 30))
    tile_size = 30
    for ty in range(floor_y, H, tile_size):
        for tx in range(0, W, tile_size):
            if (tx//tile_size + ty//tile_size) % 2 == 0:
                draw.rectangle([tx, ty, tx+tile_size, ty+tile_size], fill=(40, 37, 35))
    
    # Counter
    draw.rectangle([0, floor_y-60, int(W*0.45), floor_y], fill=(50, 40, 35))
    draw.rectangle([0, floor_y-65, int(W*0.45), floor_y-60], fill=(70, 60, 50))
    
    # Stove
    draw.rectangle([int(W*0.5), floor_y-80, int(W*0.75), floor_y], fill=(60, 58, 55))
    # Burners
    for bx in [0.55, 0.65]:
        draw.ellipse([int(W*bx)-12, floor_y-70, int(W*bx)+12, floor_y-46], fill=(40, 40, 40), outline=(80, 80, 80), width=2)
    
    # Hanging pots
    for px in [0.2, 0.35, 0.5, 0.65]:
        draw.line([(int(W*px), 0), (int(W*px), 50)], fill=(100, 90, 70), width=2)
        draw.arc([int(W*px)-15, 40, int(W*px)+15, 70], 0, 180, fill=(100, 90, 70), width=3)
    
    # Cabinets
    for cx in range(0, W, int(W*0.18)):
        draw.rectangle([cx+5, 10, cx+int(W*0.15), 100], fill=(50, 38, 28), outline=(40, 30, 22), width=2)
        draw.ellipse([cx+int(W*0.12), 50, cx+int(W*0.13), 60], fill=(150, 130, 70))
    
    # Knife rack
    kx = int(W*0.82)
    draw.rectangle([kx, 50, kx+60, 55], fill=(60, 50, 40))
    for i in range(4):
        draw.polygon([(kx+10+i*14, 55), (kx+7+i*14, 110), (kx+13+i*14, 110)], fill=(180, 180, 190))
        draw.rectangle([kx+7+i*14, 55, kx+13+i*14, 65], fill=(80, 60, 40))
    
    img = add_vignette(img, 0.6)
    return add_label(img, "La Cuisine", "Indices cachés")

def gen_garden():
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)
    # Night sky
    draw_gradient(draw, W, H, (5, 8, 25), (10, 20, 15))
    draw_stars(draw, W, H, 100)
    draw_moon(draw, 120, 50, 30)
    
    # Ground
    ground_y = int(H*0.6)
    draw.rectangle([0, ground_y, W, H], fill=(15, 30, 15))
    # Grass detail
    for _ in range(200):
        gx = random.randint(0, W)
        gy = random.randint(ground_y, H)
        gh = random.randint(5, 20)
        draw.line([(gx, gy), (gx+random.randint(-5, 5), gy-gh)], fill=(20, 45, 20), width=1)
    
    # Path
    draw.polygon([(W*0.4, H), (W*0.6, H), (W*0.55, ground_y), (W*0.45, ground_y)], fill=(50, 45, 35))
    
    # Hedges
    for hx in [0.05, 0.75]:
        draw.rounded_rectangle([int(W*hx), ground_y-40, int(W*hx)+int(W*0.2), ground_y], radius=15, fill=(15, 40, 15))
    
    # Trees
    draw_tree(draw, int(W*0.1), ground_y-30, 55, 90)
    draw_tree(draw, int(W*0.88), ground_y-40, 65, 100)
    draw_tree(draw, int(W*0.5), ground_y-50, 40, 70)
    
    # Fountain center
    draw.ellipse([int(W*0.38), ground_y-15, int(W*0.62), ground_y+20], fill=(50, 50, 60), outline=(70, 70, 80), width=2)
    draw.rectangle([int(W*0.48), ground_y-40, int(W*0.52), ground_y-10], fill=(60, 60, 70))
    
    # Fog
    for i in range(6):
        fy = ground_y - 10 + i*8
        draw.rectangle([0, fy, W, fy+10], fill=(80, 90, 80, 20))
    
    img = add_vignette(img, 0.8)
    return add_label(img, "Le Jardin", "Mystères nocturnes")

def gen_bedroom():
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)
    draw_gradient(draw, W, H, (25, 20, 30), (15, 12, 18))
    
    floor_y = int(H*0.65)
    draw_floor(draw, W, H, floor_y, (25, 20, 25))
    
    # Bed
    draw.rounded_rectangle([int(W*0.1), floor_y-80, int(W*0.55), floor_y], radius=5, fill=(100, 40, 40))
    # Headboard
    draw.rounded_rectangle([int(W*0.08), floor_y-130, int(W*0.14), floor_y-30], radius=8, fill=(65, 35, 20))
    # Pillows
    draw.rounded_rectangle([int(W*0.14), floor_y-90, int(W*0.28), floor_y-65], radius=8, fill=(200, 195, 185))
    # Sheets
    draw.rounded_rectangle([int(W*0.14), floor_y-65, int(W*0.53), floor_y-5], radius=3, fill=(180, 170, 160))
    
    # Nightstand
    draw.rectangle([int(W*0.58), floor_y-50, int(W*0.68), floor_y], fill=(55, 35, 20))
    # Lamp
    draw.rectangle([int(W*0.61), floor_y-65, int(W*0.65), floor_y-50], fill=(80, 70, 60))
    draw.polygon([(int(W*0.58), floor_y-65), (int(W*0.68), floor_y-65), (int(W*0.63), floor_y-90)], fill=(200, 180, 120))
    
    # Wardrobe
    draw.rectangle([int(W*0.75), floor_y-160, int(W*0.95), floor_y], fill=(50, 32, 18), outline=(40, 25, 12), width=2)
    draw.line([(int(W*0.85), floor_y-155), (int(W*0.85), floor_y+5)], fill=(40, 25, 12), width=2)
    draw.ellipse([int(W*0.83), floor_y-85, int(W*0.84), floor_y-75], fill=(150, 130, 60))
    draw.ellipse([int(W*0.86), floor_y-85, int(W*0.87), floor_y-75], fill=(150, 130, 60))
    
    # Mirror
    draw.ellipse([int(W*0.32), 30, int(W*0.48), 130], fill=(80, 85, 100), outline=(90, 70, 40), width=3)
    
    # Window with curtains
    draw_window(draw, int(W*0.65), 30, 70, 90, (30, 35, 60))
    draw.rectangle([int(W*0.63), 20, int(W*0.67), 130], fill=(100, 30, 30))
    draw.rectangle([int(W*0.74), 20, int(W*0.78), 130], fill=(100, 30, 30))
    
    img = add_vignette(img, 0.7)
    return add_label(img, "La Chambre", "Secrets intimes")

def gen_office():
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)
    draw_gradient(draw, W, H, (28, 28, 42), (18, 15, 25))
    
    floor_y = int(H*0.65)
    draw_floor(draw, W, H, floor_y, (20, 18, 30))
    
    # Wall panels
    for i in range(5):
        px = int(W*0.04) + i*int(W*0.2)
        draw.rectangle([px, 10, px+int(W*0.16), floor_y-10], fill=(32, 32, 46), outline=(38, 38, 52), width=1)
    
    # Large desk
    draw.rectangle([int(W*0.2), floor_y-55, int(W*0.8), floor_y-15], fill=(55, 35, 22))
    draw.rectangle([int(W*0.2), floor_y-60, int(W*0.8), floor_y-55], fill=(65, 42, 28))
    
    # Computer
    draw.rectangle([int(W*0.55), floor_y-110, int(W*0.72), floor_y-60], fill=(40, 40, 50), outline=(50, 50, 60), width=2)
    draw.rectangle([int(W*0.57), floor_y-105, int(W*0.70), floor_y-65], fill=(30, 50, 80))
    draw.rectangle([int(W*0.61), floor_y-60, int(W*0.66), floor_y-55], fill=(50, 50, 55))
    
    # Filing cabinet
    draw.rectangle([int(W*0.85), floor_y-100, int(W*0.95), floor_y], fill=(60, 60, 65), outline=(50, 50, 55), width=2)
    for i in range(3):
        cy = floor_y - 90 + i*30
        draw.rectangle([int(W*0.86), cy, int(W*0.94), cy+25], fill=(55, 55, 60), outline=(65, 65, 70), width=1)
        draw.ellipse([int(W*0.89), cy+10, int(W*0.91), cy+15], fill=(150, 130, 70))
    
    # Chair
    draw.ellipse([int(W*0.38), floor_y-40, int(W*0.55), floor_y+20], fill=(40, 40, 45))
    draw.rounded_rectangle([int(W*0.40), floor_y-80, int(W*0.53), floor_y-20], radius=8, fill=(45, 45, 50))
    
    # Clock
    draw.ellipse([int(W*0.45), 20, int(W*0.55), 70], fill=(50, 45, 40), outline=(90, 70, 40), width=2)
    draw.line([(int(W*0.5), 45), (int(W*0.5), 30)], fill=(200, 180, 80), width=2)
    draw.line([(int(W*0.5), 45), (int(W*0.53), 42)], fill=(200, 180, 80), width=2)
    
    # Papers / evidence on desk
    for _ in range(3):
        px = int(W*0.25) + random.randint(0, int(W*0.2))
        py = floor_y - 50 + random.randint(0, 15)
        draw.rectangle([px, py, px+25, py+35], fill=(200, 190, 170))
    
    img = add_vignette(img, 0.65)
    return add_label(img, "Le Bureau du Commissaire", "Quartier général")

# ===== CASE 2 — Théâtre =====

def gen_theatre_entrance():
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)
    draw_gradient(draw, W, H, (35, 15, 15), (15, 8, 12))
    
    floor_y = int(H*0.65)
    # Marble floor
    draw.rectangle([0, floor_y, W, H], fill=(45, 40, 38))
    for ty in range(floor_y, H, 40):
        for tx in range(0, W, 50):
            if (tx//50 + ty//40) % 2 == 0:
                draw.rectangle([tx, ty, tx+50, ty+40], fill=(50, 45, 42))
    
    # Grand pillars
    for px in [0.1, 0.3, 0.7, 0.9]:
        draw_pillar(draw, int(W*px)-15, 20, 30, floor_y-20, (55, 40, 35))
    
    # Red curtains
    draw.rectangle([0, 0, int(W*0.08), floor_y], fill=(120, 20, 20))
    draw.rectangle([W-int(W*0.08), 0, W, floor_y], fill=(120, 20, 20))
    # Curtain folds
    for i in range(5):
        cx = int(W*0.08) - i*3
        draw.line([(cx, 0), (cx, floor_y)], fill=(100, 15, 15), width=2)
        cx2 = W - int(W*0.08) + i*3
        draw.line([(cx2, 0), (cx2, floor_y)], fill=(100, 15, 15), width=2)
    
    # Grand staircase
    for i in range(6):
        sy = floor_y - i*8
        sw = W*0.5 - i*20
        sx = (W-sw)//2
        draw.rectangle([sx, sy, sx+sw, sy+8], fill=(55+i*3, 45+i*2, 40+i*2))
    
    # Chandelier
    draw_chandelier(draw, W//2, 30, 140)
    
    # Poster/Playbill
    draw.rectangle([int(W*0.4), 60, int(W*0.6), 160], fill=(60, 50, 40), outline=(90, 70, 40), width=3)
    draw.rectangle([int(W*0.42), 70, int(W*0.58), 150], fill=(40, 35, 30))
    
    img = add_vignette(img, 0.7)
    return add_label(img, "Hall du Théâtre", "Le Poison du Maestro")

def gen_theatre_stage():
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)
    draw_gradient(draw, W, H, (20, 15, 30), (10, 8, 15))
    
    floor_y = int(H*0.55)
    # Stage floor (wooden)
    draw.rectangle([int(W*0.1), floor_y, int(W*0.9), H], fill=(55, 38, 22))
    for i in range(0, W, 30):
        draw.line([(i, floor_y), (i, H)], fill=(50, 34, 20), width=1)
    
    # Heavy red curtains on sides
    for side in [0, 1]:
        x = 0 if side == 0 else int(W*0.8)
        w_curt = int(W*0.2)
        draw.rectangle([x, 0, x+w_curt, H], fill=(130, 20, 20))
        for f in range(8):
            fx = x + f * (w_curt//8)
            draw.line([(fx, 0), (fx, H)], fill=(110, 15, 15), width=2)
    
    # Stage back wall
    draw.rectangle([int(W*0.1), 0, int(W*0.9), floor_y], fill=(18, 15, 25))
    
    # Music stands
    for mx in [0.3, 0.5, 0.7]:
        draw.rectangle([int(W*mx)-2, floor_y-50, int(W*mx)+2, floor_y], fill=(30, 30, 35))
        draw.rectangle([int(W*mx)-15, floor_y-70, int(W*mx)+15, floor_y-50], fill=(35, 35, 40))
    
    # Grand piano (silhouette)
    draw.ellipse([int(W*0.2), floor_y-30, int(W*0.45), floor_y+40], fill=(15, 12, 10))
    draw.rectangle([int(W*0.2), floor_y-10, int(W*0.25), floor_y+60], fill=(15, 12, 10))
    
    # Spotlight beams
    for sx, alpha in [(0.35, 20), (0.5, 30), (0.65, 20)]:
        draw.polygon([(int(W*sx)-5, 0), (int(W*sx)+5, 0), (int(W*sx)+60, floor_y), (int(W*sx)-60, floor_y)], fill=(255, 245, 200, alpha))
    
    # Orchestra chairs
    for cx in range(int(W*0.25), int(W*0.75), 35):
        draw.rectangle([cx, floor_y+20, cx+20, floor_y+50], fill=(40, 25, 15))
    
    img = add_vignette(img, 0.8)
    return add_label(img, "Scène du Théâtre", "Lieu du drame")

def gen_backstage():
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)
    draw_gradient(draw, W, H, (22, 20, 25), (12, 10, 15))
    
    floor_y = int(H*0.65)
    draw.rectangle([0, floor_y, W, H], fill=(28, 25, 22))
    
    # Concrete walls
    for i in range(0, floor_y, 3):
        c = 22 + random.randint(-3, 3)
        draw.line([(0, i), (W, i)], fill=(c, c-2, c+3), width=1)
    
    # Costume rack
    draw.rectangle([int(W*0.05), floor_y-140, int(W*0.3), floor_y-135], fill=(60, 60, 65))
    # Poles
    draw.rectangle([int(W*0.07), floor_y-135, int(W*0.08), floor_y], fill=(55, 55, 60))
    draw.rectangle([int(W*0.27), floor_y-135, int(W*0.28), floor_y], fill=(55, 55, 60))
    # Hanging costumes
    colors = [(130, 20, 20), (20, 60, 130), (100, 80, 20), (20, 100, 50), (80, 20, 100)]
    for i, c in enumerate(colors):
        cx = int(W*0.09) + i*28
        draw.polygon([(cx, floor_y-130), (cx-12, floor_y-40), (cx+12, floor_y-40)], fill=c)
    
    # Mirror with lights
    draw.rectangle([int(W*0.5), 30, int(W*0.75), 200], fill=(80, 85, 100), outline=(90, 70, 40), width=3)
    # Bulbs around mirror
    for by in range(40, 200, 25):
        draw.ellipse([int(W*0.48), by-5, int(W*0.50), by+5], fill=(255, 240, 180))
        draw.ellipse([int(W*0.75), by-5, int(W*0.77), by+5], fill=(255, 240, 180))
    
    # Makeup table
    draw.rectangle([int(W*0.5), floor_y-50, int(W*0.78), floor_y], fill=(50, 35, 22))
    
    # Props scattered
    draw.ellipse([int(W*0.82), floor_y-30, int(W*0.88), floor_y-10], fill=(180, 160, 40))  # mask
    draw.rectangle([int(W*0.35), floor_y-60, int(W*0.45), floor_y], fill=(80, 75, 70))  # crate
    
    # Exposed pipes on ceiling
    for py in [8, 20]:
        draw.line([(0, py), (W, py)], fill=(65, 65, 70), width=4)
    
    img = add_vignette(img, 0.7)
    return add_label(img, "Les Coulisses", "Arrière-scène")

# ===== CASE 3 — Phare / Île =====

def gen_island_dock():
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)
    # Twilight sky
    draw_gradient(draw, W, H, (15, 20, 50), (40, 60, 80))
    draw_stars(draw, W, int(H*0.3), 40)
    
    # Sea
    sea_y = int(H*0.5)
    draw.rectangle([0, sea_y, W, H], fill=(15, 30, 55))
    # Waves
    for i in range(12):
        wy = sea_y + i*12 + random.randint(-3, 3)
        pts = []
        for x in range(0, W+20, 20):
            pts.append((x, wy + int(5*math.sin(x/30 + i))))
        if len(pts) > 1:
            draw.line(pts, fill=(25, 40, 65), width=2)
    
    # Dock - wooden planks
    dock_y = int(H*0.6)
    draw.polygon([(int(W*0.3), dock_y), (int(W*0.8), dock_y), (int(W*0.75), H), (int(W*0.25), H)], fill=(55, 40, 25))
    for i in range(8):
        dy = dock_y + i*((H-dock_y)//8)
        draw.line([(int(W*0.28), dy), (int(W*0.78), dy)], fill=(45, 32, 18), width=2)
    
    # Dock posts
    for px in [0.32, 0.72]:
        draw.rectangle([int(W*px), dock_y-30, int(W*px)+8, dock_y+20], fill=(50, 35, 20))
        # Rope
        draw.arc([int(W*px)-10, dock_y-35, int(W*px)+18, dock_y-15], 0, 180, fill=(120, 100, 60), width=2)
    
    # Small boat
    draw.polygon([(int(W*0.1), H-40), (int(W*0.05), H-15), (int(W*0.25), H-15), (int(W*0.2), H-40)], fill=(60, 45, 30))
    
    # Lighthouse in background
    draw.rectangle([int(W*0.85), 40, int(W*0.9), sea_y], fill=(200, 195, 185))
    draw.polygon([(int(W*0.83), 40), (int(W*0.875), 10), (int(W*0.92), 40)], fill=(180, 30, 30))
    # Light beam
    draw.polygon([(int(W*0.875), 15), (W, sea_y*0.3), (W, sea_y*0.5)], fill=(255, 255, 200, 15))
    
    img = add_vignette(img, 0.75)
    return add_label(img, "Quai de l'Île", "L'île isolée")

def gen_lighthouse():
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)
    draw_gradient(draw, W, H, (10, 15, 35), (25, 30, 40))
    draw_stars(draw, W, int(H*0.4), 60)
    
    ground_y = int(H*0.75)
    # Rocky ground
    draw.rectangle([0, ground_y, W, H], fill=(40, 38, 35))
    for _ in range(15):
        rx = random.randint(0, W)
        ry = random.randint(ground_y, H)
        rr = random.randint(10, 30)
        draw.ellipse([rx-rr, ry-rr//2, rx+rr, ry+rr//2], fill=(45+random.randint(-5,5), 42, 38))
    
    # Lighthouse tower
    tw = int(W*0.12)
    tx = W//2 - tw//2
    draw.rectangle([tx, int(H*0.15), tx+tw, ground_y], fill=(195, 190, 180))
    # Red stripes
    for i in range(4):
        sy = int(H*0.15) + i*int((ground_y-H*0.15)/4)
        draw.rectangle([tx, sy, tx+tw, sy+int((ground_y-H*0.15)/8)], fill=(180, 30, 30))
    
    # Lantern room
    lr_y = int(H*0.1)
    draw.rectangle([tx-10, lr_y, tx+tw+10, int(H*0.15)], fill=(50, 50, 55))
    # Glass
    draw.rectangle([tx-5, lr_y+5, tx+tw+5, int(H*0.15)-3], fill=(200, 200, 150, 60))
    # Light beam
    draw.polygon([(tx+tw//2, lr_y), (0, 0), (int(W*0.3), 0)], fill=(255, 250, 200, 12))
    draw.polygon([(tx+tw//2, lr_y), (W, int(H*0.2)), (W, 0)], fill=(255, 250, 200, 10))
    
    # Door
    draw.rounded_rectangle([tx+tw//2-15, ground_y-50, tx+tw//2+15, ground_y], radius=15, fill=(60, 40, 25))
    draw.ellipse([tx+tw//2+8, ground_y-30, tx+tw//2+12, ground_y-26], fill=(180, 150, 60))
    
    # Sea in background
    draw.rectangle([0, int(H*0.55), W, ground_y], fill=(15, 25, 50))
    
    img = add_vignette(img, 0.8)
    return add_label(img, "Le Phare", "Sentinelle solitaire")

def gen_lighthouse_top():
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)
    # View from top — mostly sky and sea
    draw_gradient(draw, W, H, (5, 10, 30), (20, 35, 60))
    draw_stars(draw, W, int(H*0.3), 80)
    draw_moon(draw, W-80, 50, 28)
    
    # Sea horizon
    sea_y = int(H*0.5)
    draw.rectangle([0, sea_y, W, H], fill=(10, 20, 45))
    # Waves far
    for i in range(20):
        wy = sea_y + i*8
        for x in range(0, W, 40):
            draw.line([(x, wy), (x+20, wy+2)], fill=(15, 25, 50), width=1)
    
    # Lantern mechanism (foreground)
    cx, cy = W//2, int(H*0.6)
    # Lens
    draw.ellipse([cx-60, cy-60, cx+60, cy+60], fill=(200, 200, 150, 40), outline=(160, 155, 130), width=4)
    draw.ellipse([cx-40, cy-40, cx+40, cy+40], fill=(255, 250, 200, 60), outline=(180, 170, 120), width=3)
    # Inner light
    draw.ellipse([cx-15, cy-15, cx+15, cy+15], fill=(255, 255, 200))
    
    # Metal railing
    railing_y = int(H*0.85)
    draw.rectangle([0, railing_y, W, railing_y+5], fill=(60, 60, 65))
    for rx in range(0, W, 25):
        draw.rectangle([rx, railing_y-30, rx+3, railing_y], fill=(55, 55, 60))
    
    # Glass panels (window frame)
    for i in range(5):
        x = i * W//4
        draw.line([(x, 0), (x, railing_y)], fill=(50, 50, 55, 80), width=3)
    draw.line([(0, sea_y), (W, sea_y)], fill=(50, 50, 55, 60), width=2)
    
    img = add_vignette(img, 0.7)
    return add_label(img, "Sommet du Phare", "Vue panoramique")

def gen_keeper_house():
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)
    draw_gradient(draw, W, H, (28, 25, 30), (18, 15, 20))
    
    floor_y = int(H*0.65)
    draw_floor(draw, W, H, floor_y, (30, 25, 22))
    
    # Stone wall texture
    for y in range(0, floor_y, 20):
        for x in range(0, W, 35):
            offset = 17 if (y//20) % 2 else 0
            c = 28 + random.randint(-3, 3)
            draw.rectangle([x+offset, y, x+offset+32, y+18], fill=(c, c-2, c-1), outline=(c+5, c+3, c+2), width=1)
    
    # Fireplace
    fx = int(W*0.6)
    draw.rectangle([fx, floor_y-120, fx+150, floor_y], fill=(50, 45, 40), outline=(45, 40, 35), width=3)
    draw.rectangle([fx+15, floor_y-80, fx+135, floor_y-5], fill=(10, 8, 5))
    for i in range(5):
        fc = random.randint(180, 255)
        fs = random.randint(6, 15)
        ffx = fx + 30 + random.randint(0, 70)
        ffy = floor_y - 25 - random.randint(0, 40)
        draw.ellipse([ffx-fs, ffy-fs, ffx+fs, ffy+fs], fill=(fc, fc//2, 10))
    
    # Old table
    draw.rectangle([int(W*0.1), floor_y-45, int(W*0.5), floor_y-15], fill=(50, 35, 20))
    # Oil lamp on table
    draw.rectangle([int(W*0.28), floor_y-65, int(W*0.32), floor_y-45], fill=(60, 50, 30))
    draw.ellipse([int(W*0.275), floor_y-80, int(W*0.325), floor_y-65], fill=(255, 220, 100))
    
    # Maritime objects
    # Ship wheel on wall
    cx_w, cy_w = int(W*0.3), 80
    draw.ellipse([cx_w-35, cy_w-35, cx_w+35, cy_w+35], outline=(80, 60, 30), width=5)
    for angle in range(0, 360, 45):
        sx = cx_w + int(30*math.cos(math.radians(angle)))
        sy = cy_w + int(30*math.sin(math.radians(angle)))
        draw.line([(cx_w, cy_w), (sx, sy)], fill=(80, 60, 30), width=3)
    
    # Window with sea view
    draw_window(draw, int(W*0.7), 30, 80, 90, (20, 35, 60))
    
    img = add_vignette(img, 0.7)
    return add_label(img, "Maison du Gardien", "Vie maritime")

def gen_boathouse():
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)
    draw_gradient(draw, W, H, (20, 22, 28), (12, 14, 18))
    
    floor_y = int(H*0.6)
    # Water floor
    draw.rectangle([0, floor_y, W, H], fill=(12, 22, 40))
    for i in range(10):
        wy = floor_y + i*10
        draw.line([(0, wy), (W, wy+3)], fill=(15, 25, 45), width=1)
    
    # Wooden walls
    for x in range(0, W, 15):
        c = 30 + random.randint(-5, 5)
        draw.rectangle([x, 0, x+13, floor_y], fill=(c+10, c, c-5))
    
    # Boat
    draw.polygon([(int(W*0.2), floor_y+10), (int(W*0.15), floor_y+50), (int(W*0.65), floor_y+50), (int(W*0.6), floor_y+10)], fill=(50, 35, 20))
    draw.line([(int(W*0.4), floor_y-20), (int(W*0.4), floor_y+10)], fill=(60, 45, 25), width=3)
    
    # Tools hanging on wall
    for tx in [0.15, 0.3, 0.45, 0.6]:
        draw.line([(int(W*tx), 30), (int(W*tx), 30+random.randint(40, 80))], fill=(80, 75, 70), width=3)
    
    # Rope coils
    cx, cy = int(W*0.75), floor_y-30
    for i in range(4):
        draw.ellipse([cx-20+i*3, cy-20+i*3, cx+20-i*3, cy+20-i*3], outline=(120, 100, 60), width=3)
    
    # Oil drum
    draw.rectangle([int(W*0.82), floor_y-60, int(W*0.92), floor_y], fill=(50, 60, 50), outline=(40, 50, 40), width=2)
    
    # Fishing nets
    for ny in range(20, 120, 15):
        for nx in range(int(W*0.65), W-10, 15):
            draw.line([(nx, ny), (nx+15, ny+15)], fill=(80, 70, 50), width=1)
            draw.line([(nx+15, ny), (nx, ny+15)], fill=(80, 70, 50), width=1)
    
    img = add_vignette(img, 0.75)
    return add_label(img, "Remise à Bateaux", "Outils et secrets")

# ===== CASE 4 — Musée =====

def gen_museum_entrance():
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)
    draw_gradient(draw, W, H, (30, 28, 35), (15, 13, 20))
    
    floor_y = int(H*0.65)
    # Polished marble floor
    draw.rectangle([0, floor_y, W, H], fill=(42, 40, 45))
    for ty in range(floor_y, H, 45):
        for tx in range(0, W, 55):
            if (tx//55 + ty//45) % 2 == 0:
                draw.rectangle([tx, ty, tx+55, ty+45], fill=(48, 46, 50))
    
    # Grand pillars
    for px in [0.08, 0.28, 0.72, 0.92]:
        draw_pillar(draw, int(W*px)-15, 10, 30, floor_y-10, (50, 48, 55))
    
    # Grand entrance arch
    draw.arc([int(W*0.3), 0, int(W*0.7), 100], 180, 360, fill=(60, 55, 50), width=8)
    
    # Museum sign
    draw.rectangle([int(W*0.35), 50, int(W*0.65), 90], fill=(40, 35, 30))
    try:
        font = ImageFont.truetype('arial.ttf', 14)
    except:
        font = ImageFont.load_default()
    draw.text((int(W*0.38), 60), "MUSÉE D'ART", fill=(200, 180, 80), font=font)
    
    # Sculpture on pedestal
    draw.rectangle([int(W*0.45), floor_y-30, int(W*0.55), floor_y], fill=(60, 58, 65))
    draw.ellipse([int(W*0.47), floor_y-80, int(W*0.53), floor_y-30], fill=(170, 165, 160))
    draw.ellipse([int(W*0.475), floor_y-100, int(W*0.525), floor_y-75], fill=(175, 170, 165))
    
    # Velvet ropes
    for rx in [0.35, 0.65]:
        draw.rectangle([int(W*rx)-3, floor_y-40, int(W*rx)+3, floor_y], fill=(150, 130, 60))
    draw.line([(int(W*0.35), floor_y-35), (int(W*0.65), floor_y-35)], fill=(130, 20, 20), width=3)
    
    # Spotlights
    for sx in [0.25, 0.5, 0.75]:
        draw.polygon([(int(W*sx), 0), (int(W*sx)-30, 40), (int(W*sx)+30, 40)], fill=(255, 250, 230, 15))
    
    draw_chandelier(draw, W//2, 15, 120)
    
    img = add_vignette(img, 0.65)
    return add_label(img, "Hall du Musée", "Le Secret du Musée")

def gen_museum_gallery():
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)
    draw_gradient(draw, W, H, (32, 30, 38), (18, 16, 22))
    
    floor_y = int(H*0.65)
    draw.rectangle([0, floor_y, W, H], fill=(38, 35, 40))
    
    # Paintings on wall with frames and spotlights
    paintings = [
        (0.08, 40, 140, 160, (80, 60, 40)),
        (0.28, 50, 120, 140, (40, 60, 90)),
        (0.50, 35, 160, 170, (70, 40, 40)),
        (0.72, 45, 130, 150, (50, 70, 50)),
    ]
    for px, py, pw, ph, pc in paintings:
        x = int(W*px)
        # Frame
        draw.rectangle([x-5, py-5, x+pw+5, py+ph+5], fill=(120, 90, 40), outline=(100, 75, 30), width=3)
        # Canvas
        draw.rectangle([x, py, x+pw, py+ph], fill=pc)
        # Abstract art detail
        for _ in range(5):
            ax = x + random.randint(10, pw-10)
            ay = py + random.randint(10, ph-10)
            ar = random.randint(8, 25)
            ac = (pc[0]+random.randint(-30,30), pc[1]+random.randint(-30,30), pc[2]+random.randint(-30,30))
            ac = tuple(max(0, min(255, c)) for c in ac)
            draw.ellipse([ax-ar, ay-ar, ax+ar, ay+ar], fill=ac)
        # Spotlight from above
        draw.polygon([(x+pw//2-5, 0), (x+pw//2+5, 0), (x+pw+20, py), (x-20, py)], fill=(255, 250, 220, 10))
    
    # Empty frame with POLICE tape (stolen painting!)
    ex = int(W*0.50)
    draw.rectangle([ex-5, 35-5, ex+165, 175], fill=(120, 90, 40), outline=(100, 75, 30), width=3)
    draw.rectangle([ex, 35, ex+160, 170], fill=(25, 22, 30))
    # Police tape
    draw.line([(ex, 35), (ex+160, 170)], fill=(255, 200, 0), width=4)
    draw.line([(ex+160, 35), (ex, 170)], fill=(255, 200, 0), width=4)
    
    # Bench
    draw.rounded_rectangle([int(W*0.35), floor_y-25, int(W*0.65), floor_y], radius=3, fill=(50, 35, 22))
    draw.rectangle([int(W*0.37), floor_y, int(W*0.39), floor_y+20], fill=(45, 30, 18))
    draw.rectangle([int(W*0.61), floor_y, int(W*0.63), floor_y+20], fill=(45, 30, 18))
    
    img = add_vignette(img, 0.6)
    return add_label(img, "Salle d'Exposition", "Tableau disparu")

def gen_museum_security():
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)
    draw_gradient(draw, W, H, (20, 22, 30), (12, 14, 18))
    
    floor_y = int(H*0.65)
    draw.rectangle([0, floor_y, W, H], fill=(25, 25, 28))
    
    # Monitor wall
    for row in range(2):
        for col in range(4):
            mx = int(W*0.1) + col*int(W*0.2)
            my = 30 + row*120
            # Monitor frame
            draw.rectangle([mx, my, mx+int(W*0.17), my+100], fill=(30, 30, 35), outline=(50, 50, 55), width=2)
            # Screen (various security cam views)
            sc = [(20, 35, 20), (25, 30, 25), (30, 25, 30), (20, 25, 35)]
            draw.rectangle([mx+5, my+5, mx+int(W*0.17)-5, my+95], fill=sc[(row*4+col) % 4])
            # Static lines
            for sl in range(my+10, my+90, 8):
                draw.line([(mx+8, sl), (mx+int(W*0.17)-8, sl)], fill=(40, 50, 40, 30), width=1)
            # REC indicator
            draw.ellipse([mx+int(W*0.15)-15, my+8, mx+int(W*0.15)-8, my+15], fill=(255, 0, 0))
    
    # Control desk
    draw.rectangle([int(W*0.15), floor_y-40, int(W*0.85), floor_y], fill=(40, 40, 45))
    draw.rectangle([int(W*0.15), floor_y-45, int(W*0.85), floor_y-40], fill=(50, 50, 55))
    
    # Keyboard, mouse, coffee
    draw.rectangle([int(W*0.5), floor_y-38, int(W*0.65), floor_y-25], fill=(25, 25, 30), outline=(35, 35, 40), width=1)
    draw.ellipse([int(W*0.7), floor_y-38, int(W*0.74), floor_y-20], fill=(70, 50, 30), outline=(60, 40, 25), width=2)
    
    # Chair
    draw.ellipse([int(W*0.4), floor_y+5, int(W*0.6), floor_y+40], fill=(30, 30, 35))
    
    img = add_vignette(img, 0.7)
    return add_label(img, "Salle de Sécurité", "Surveillance 24h/24")

def gen_museum_office():
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)
    draw_gradient(draw, W, H, (28, 26, 35), (16, 14, 20))
    
    floor_y = int(H*0.65)
    draw_floor(draw, W, H, floor_y, (26, 22, 30))
    
    # Elegant wallpaper
    for y in range(0, floor_y, 25):
        for x in range(0, W, 35):
            draw.rectangle([x+12, y+8, x+23, y+17], fill=(32, 30, 38))
    
    # Large desk
    draw.rectangle([int(W*0.2), floor_y-50, int(W*0.75), floor_y-15], fill=(60, 38, 22))
    draw.rectangle([int(W*0.2), floor_y-55, int(W*0.75), floor_y-50], fill=(70, 45, 28))
    
    # Art catalog / papers
    for _ in range(5):
        px = int(W*0.25) + random.randint(0, int(W*0.4))
        py = floor_y - 48 + random.randint(0, 18)
        draw.rectangle([px, py, px+20, py+28], fill=(200, 190, 170))
    
    # Small painting on wall
    draw.rectangle([int(W*0.4), 40, int(W*0.6), 140], fill=(70, 50, 35), outline=(100, 75, 35), width=3)
    
    # Bookshelf on side
    draw_bookshelf(draw, int(W*0.78), 30, int(W*0.2), floor_y-40)
    
    # Elegant chair
    draw.rounded_rectangle([int(W*0.4), floor_y-30, int(W*0.55), floor_y+20], radius=5, fill=(80, 30, 30))
    
    # Safe (partially visible)
    draw.rectangle([int(W*0.02), floor_y-80, int(W*0.15), floor_y], fill=(55, 55, 60), outline=(65, 65, 70), width=2)
    draw.ellipse([int(W*0.06), floor_y-55, int(W*0.11), floor_y-30], outline=(150, 130, 60), width=3)
    
    img = add_vignette(img, 0.65)
    return add_label(img, "Bureau de Conservation", "Documents confidentiels")

def gen_museum_workshop():
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)
    draw_gradient(draw, W, H, (25, 25, 28), (15, 15, 18))
    
    floor_y = int(H*0.65)
    draw.rectangle([0, floor_y, W, H], fill=(30, 28, 25))
    
    # Work table (large)
    draw.rectangle([int(W*0.1), floor_y-50, int(W*0.6), floor_y], fill=(55, 45, 30))
    draw.rectangle([int(W*0.1), floor_y-55, int(W*0.6), floor_y-50], fill=(65, 52, 35))
    
    # Canvas on easel
    draw.line([(int(W*0.72), floor_y), (int(W*0.68), 40)], fill=(50, 40, 25), width=4)
    draw.line([(int(W*0.82), floor_y), (int(W*0.78), 40)], fill=(50, 40, 25), width=4)
    draw.line([(int(W*0.68), 40), (int(W*0.78), 40)], fill=(50, 40, 25), width=3)
    draw.rectangle([int(W*0.68), 45, int(W*0.85), 180], fill=(180, 175, 160), outline=(120, 100, 50), width=2)
    
    # Paint supplies
    colors_p = [(200, 30, 30), (30, 80, 200), (250, 200, 30), (30, 150, 50), (200, 200, 200)]
    for i, c in enumerate(colors_p):
        draw.rectangle([int(W*0.15)+i*22, floor_y-48, int(W*0.15)+i*22+15, floor_y-25], fill=c)
    
    # Brushes in jar
    draw.rectangle([int(W*0.48), floor_y-70, int(W*0.53), floor_y-45], fill=(80, 70, 50), outline=(70, 60, 40), width=2)
    for i in range(5):
        bx = int(W*0.49) + i*4
        draw.line([(bx, floor_y-90-random.randint(0,15)), (bx, floor_y-70)], fill=(100, 80, 50), width=2)
    
    # Magnifying glass
    mgx, mgy = int(W*0.35), floor_y-45
    draw.ellipse([mgx-12, mgy-12, mgx+12, mgy+12], outline=(150, 140, 120), width=3)
    draw.line([(mgx+8, mgy+8), (mgx+20, mgy+20)], fill=(120, 110, 90), width=3)
    
    # Chemical bottles on shelf
    draw.rectangle([int(W*0.7), 200, int(W*0.95), 205], fill=(50, 45, 40))
    for i in range(5):
        bx = int(W*0.72) + i*22
        bh = random.randint(25, 45)
        draw.rectangle([bx, 200-bh, bx+15, 200], fill=(random.randint(40,100), random.randint(60,120), random.randint(80,140)))
    
    # UV light on table
    draw.rectangle([int(W*0.4), floor_y-60, int(W*0.43), floor_y-45], fill=(80, 50, 120))
    draw.ellipse([int(W*0.395), floor_y-65, int(W*0.435), floor_y-58], fill=(120, 80, 200))
    
    img = add_vignette(img, 0.65)
    return add_label(img, "Atelier de Restauration", "Art et chimie")


# ========== GENERATE ALL ==========
scenes = {
    # Case 1
    'mansion_entrance': gen_mansion_entrance,
    'living_room': gen_living_room,
    'study': gen_study,
    'kitchen': gen_kitchen,
    'garden': gen_garden,
    'bedroom': gen_bedroom,
    'office': gen_office,
    # Case 2
    'theatre_entrance': gen_theatre_entrance,
    'theatre_stage': gen_theatre_stage,
    'backstage': gen_backstage,
    # Case 3
    'island_dock': gen_island_dock,
    'lighthouse': gen_lighthouse,
    'lighthouse_top': gen_lighthouse_top,
    'keeper_house': gen_keeper_house,
    'boathouse': gen_boathouse,
    # Case 4
    'museum_entrance': gen_museum_entrance,
    'museum_gallery': gen_museum_gallery,
    'museum_security': gen_museum_security,
    'museum_office': gen_museum_office,
    'museum_workshop': gen_museum_workshop,
}

random.seed(42)  # Reproducible

for name, gen_func in scenes.items():
    print(f"Generating {name}...", end=" ")
    img = gen_func()
    # Save as optimized JPEG for smaller file size
    rgb_img = img.convert('RGB')
    path = os.path.join(OUTPUT_DIR, f"{name}.jpg")
    rgb_img.save(path, 'JPEG', quality=82, optimize=True)
    size_kb = os.path.getsize(path) / 1024
    print(f"OK ({size_kb:.1f} KB)")

print(f"\n✅ {len(scenes)} images générées dans {OUTPUT_DIR}")
total_size = sum(os.path.getsize(os.path.join(OUTPUT_DIR, f)) for f in os.listdir(OUTPUT_DIR)) / 1024
print(f"📦 Taille totale: {total_size:.0f} KB")
