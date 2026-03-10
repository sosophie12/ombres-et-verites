"""
Generate rich atmospheric scene images for Ombres & Vérités v2
Higher quality, more detail, better composition
"""
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import random, math, os

OUTPUT = r'c:\Users\Souso\OneDrive\Documents\Game\images\scenes'
W, H = 1024, 640
random.seed(2026)

# ── helpers ──────────────────────────────────────────────

def gradient(draw, w, h, c1, c2, vertical=True):
    for i in range(h if vertical else w):
        t = i / (h if vertical else w)
        r = int(c1[0]+(c2[0]-c1[0])*t)
        g = int(c1[1]+(c2[1]-c1[1])*t)
        b = int(c1[2]+(c2[2]-c1[2])*t)
        if vertical:
            draw.line([(0,i),(w,i)], fill=(r,g,b))
        else:
            draw.line([(i,0),(i,h)], fill=(r,g,b))

def stars(draw, w, h, n=80):
    for _ in range(n):
        x = random.randint(0,w)
        y = random.randint(0, int(h*0.45))
        s = random.randint(1,3)
        b = random.randint(160,255)
        draw.ellipse([x-s,y-s,x+s,y+s], fill=(b, b, min(b+20,255)))

def moon(draw, x, y, r=30):
    # Outer glow
    for i in range(8, 0, -1):
        a = 15 + i*3
        gr = r + i*10
        draw.ellipse([x-gr,y-gr,x+gr,y+gr], fill=(255, 250, 200, a))
    draw.ellipse([x-r,y-r,x+r,y+r], fill=(245, 240, 210))
    # Crescent shadow
    draw.ellipse([x-r+8,y-r-3,x+r+8,y+r-3], fill=(10, 15, 35))

def window_glow(draw, x, y, w, h, color=(200, 180, 90), warm=True):
    # Outer glow
    for i in range(5):
        gx, gy = x-i*4, y-i*3
        gw, gh = w+i*8, h+i*6
        a = 20-i*4
        draw.rectangle([gx,gy,gx+gw,gy+gh], fill=(*color, max(a,3)))
    # Window pane
    draw.rectangle([x,y,x+w,y+h], fill=color)
    # Cross bars
    cx, cy = x+w//2, y+h//2
    draw.line([(cx,y),(cx,y+h)], fill=(40,35,30), width=3)
    draw.line([(x,cy),(x+w,cy)], fill=(40,35,30), width=3)
    # Frame
    draw.rectangle([x,y,x+w,y+h], outline=(50,40,30), width=3)

def wood_floor(draw, w, h, y0, color=(35,28,18)):
    draw.rectangle([0,y0,w,h], fill=color)
    plank_h = 4
    for y in range(y0, h, plank_h):
        c = (color[0]+random.randint(-3,3), color[1]+random.randint(-3,3), color[2]+random.randint(-2,2))
        draw.line([(0,y),(w,y)], fill=c, width=1)
    # Perspective
    for i in range(14):
        x = i * w // 13
        draw.line([(w//2, y0),(x, h)], fill=(color[0]+6, color[1]+6, color[2]+4), width=1)

def stone_wall(draw, w, h, y0=0, y1=None, color=(30,28,32)):
    if y1 is None: y1 = h
    for row in range(y0, y1, 22):
        offset = 18 if (row//22) % 2 else 0
        for col in range(-20, w+20, 38):
            c = (color[0]+random.randint(-4,4), color[1]+random.randint(-4,4), color[2]+random.randint(-4,4))
            draw.rectangle([col+offset, row, col+offset+35, row+20], fill=c, outline=(c[0]+5,c[1]+5,c[2]+5), width=1)

def bookshelf(draw, x, y, w, h):
    draw.rectangle([x,y,x+w,y+h], fill=(50,32,18), outline=(38,22,12), width=2)
    shelf_h = h // 5
    for s in range(1, 5):
        sy = y + s*shelf_h
        draw.line([(x,sy),(x+w,sy)], fill=(38,22,12), width=2)
        bx = x + 4
        while bx < x+w-10:
            bw = random.randint(5,14)
            bh = shelf_h - random.randint(6,12)
            bc = random.choice([(140,30,30),(30,50,140),(45,90,45),(130,90,25),(80,25,80),(30,75,95),(150,40,60),(40,100,80)])
            draw.rectangle([bx, sy-bh-2, bx+bw, sy-2], fill=bc)
            bx += bw + random.randint(1,3)

def chandelier(draw, cx, y, w):
    draw.line([(cx,0),(cx,y)], fill=(160,140,80), width=2)
    # Arms
    pts = 7
    for i in range(pts):
        ax = cx - w//2 + i*(w//(pts-1))
        draw.line([(cx,y),(ax,y+5)], fill=(140,120,70), width=2)
        # Candle
        draw.rectangle([ax-2,y-12,ax+2,y+5], fill=(220,210,180))
        # Flame
        draw.ellipse([ax-5,y-28,ax+5,y-12], fill=(255,220,60))
        draw.ellipse([ax-3,y-24,ax+3,y-14], fill=(255,255,160))
    # Glow
    for i in range(6):
        r = 30+i*20
        draw.ellipse([cx-r,y-r,cx+r,y+r], fill=(255,240,150, max(12-i*2, 2)))

def tree(draw, x, base_y, trunk_h=120, canopy_r=60):
    tw = canopy_r//4
    draw.rectangle([x-tw,base_y-trunk_h,x+tw,base_y], fill=(35,25,15))
    # Branch-like shapes
    for _ in range(3):
        bx = x + random.randint(-canopy_r//2, canopy_r//2)
        by = base_y - trunk_h + random.randint(0, trunk_h//2)
        draw.line([(x,by),(bx,by-random.randint(10,30))], fill=(30,22,12), width=2)
    # Canopy layers
    cy = base_y - trunk_h - canopy_r//3
    for layer in range(3):
        lr = canopy_r - layer*8
        lc = (15+layer*5, 38+layer*8, 15+layer*3)
        draw.ellipse([x-lr+random.randint(-5,5), cy-lr+layer*10+random.randint(-5,5),
                       x+lr+random.randint(-5,5), cy+lr+layer*10+random.randint(-5,5)], fill=lc)

def fog_layer(draw, w, y, h, alpha=25):
    for i in range(h):
        a = int(alpha * math.sin(math.pi * i / h))
        draw.line([(0,y+i),(w,y+i)], fill=(120,125,130, max(a, 2)))

def vignette(img, strength=0.75):
    w, h = img.size
    v = Image.new('RGBA', (w, h), (0,0,0,0))
    d = ImageDraw.Draw(v)
    max_dim = max(w, h)
    for i in range(60):
        a = int(strength * 255 * (1 - i/60))
        if a < 1: a = 1
        d.rectangle([i, i, w-i, i+1], fill=(0,0,0,a))
        d.rectangle([i, h-i-1, w-i, h-i], fill=(0,0,0,a))
        d.rectangle([i, i, i+1, h-i], fill=(0,0,0,a))
        d.rectangle([w-i-1, i, w-i, h-i], fill=(0,0,0,a))
    return Image.alpha_composite(img.convert('RGBA'), v)

def label(img, title, subtitle=""):
    draw = ImageDraw.Draw(img)
    w, h = img.size
    try:
        ft = ImageFont.truetype('arial.ttf', 24)
        fs = ImageFont.truetype('arial.ttf', 15)
    except:
        ft = ImageFont.load_default()
        fs = ft
    bar_h = 56 if subtitle else 40
    bar = Image.new('RGBA', (w, bar_h), (0,0,0,160))
    img.paste(Image.alpha_composite(Image.new('RGBA',(w,bar_h),(0,0,0,0)), bar), (0, h-bar_h))
    draw = ImageDraw.Draw(img)
    bb = draw.textbbox((0,0), title, font=ft)
    tw = bb[2]-bb[0]
    draw.text(((w-tw)//2, h-bar_h+6), title, fill=(212,168,67), font=ft)
    if subtitle:
        bb2 = draw.textbbox((0,0), subtitle, font=fs)
        tw2 = bb2[2]-bb2[0]
        draw.text(((w-tw2)//2, h-bar_h+32), subtitle, fill=(180,180,180), font=fs)
    return img

def save(img, name):
    img = vignette(img, 0.8)
    # Slight blur for painterly feel
    img_rgb = img.convert('RGB')
    path = os.path.join(OUTPUT, f"{name}.jpg")
    img_rgb.save(path, 'JPEG', quality=88, optimize=True)
    sz = os.path.getsize(path)/1024
    print(f"  {name}.jpg — {sz:.1f} KB")
    return img

# ═══════════════════════════════════════════════════════
# CASE 1: Manoir Beaumont
# ═══════════════════════════════════════════════════════

def gen_mansion_entrance():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (5,5,20), (12,15,30))
    stars(d, W, H, 120)
    moon(d, W-120, 70, 32)
    
    # Ground
    gy = int(H*0.72)
    d.rectangle([0,gy,W,H], fill=(18,25,14))
    for _ in range(300):
        gx = random.randint(0,W)
        gy2 = random.randint(gy, H)
        d.line([(gx,gy2),(gx+random.randint(-4,4),gy2-random.randint(4,18))], fill=(22,38,18), width=1)
    
    # Gravel path
    d.polygon([(W*0.38,H),(W*0.62,H),(W*0.56,gy),(W*0.44,gy)], fill=(42,38,32))
    for _ in range(100):
        px = random.randint(int(W*0.38), int(W*0.62))
        py = random.randint(gy, H)
        d.ellipse([px-2,py-1,px+2,py+1], fill=(48+random.randint(-5,5),44,38))
    
    # Mansion body
    my = int(H*0.18)
    d.rectangle([int(W*0.18), my, int(W*0.82), gy], fill=(28,24,22))
    # Stones texture
    for row in range(my, gy, 15):
        off = 10 if (row//15)%2 else 0
        for col in range(int(W*0.18), int(W*0.82), 25):
            c = 28+random.randint(-3,3)
            d.rectangle([col+off,row,col+off+23,row+13], fill=(c,c-3,c-4), outline=(c+3,c,c-1))
    
    # Roof
    d.polygon([(int(W*0.13),my), (W//2,my-100), (int(W*0.87),my)], fill=(22,18,16))
    # Roof tiles
    for ry in range(my-100, my, 12):
        for rx in range(int(W*0.15), int(W*0.85), 20):
            d.rectangle([rx,ry,rx+18,ry+10], fill=(24+random.randint(-2,2),19,17))
    
    # Tower
    d.rectangle([int(W*0.68), my-70, int(W*0.78), my], fill=(26,22,20))
    d.polygon([(int(W*0.66),my-70), (int(W*0.73),my-120), (int(W*0.80),my-70)], fill=(20,16,14))
    # Tower window
    window_glow(d, int(W*0.71), my-55, 25, 35, (180,150,70))
    
    # Windows (two rows)
    for wy, wh in [(0.30, 55), (0.50, 50)]:
        for wx in [0.26, 0.38, 0.50, 0.62]:
            window_glow(d, int(W*wx), int(H*wy), 38, wh, random.choice([(190,170,80),(170,150,65),(200,180,95)]))
    
    # Grand door
    dx, dy = int(W*0.44), int(H*0.52)
    dw, dh = int(W*0.12), gy-int(H*0.52)
    d.rectangle([dx,dy,dx+dw,dy+dh], fill=(45,30,18))
    d.rectangle([dx,dy,dx+dw,dy+dh], outline=(60,42,25), width=3)
    # Door arch
    d.arc([dx-5,dy-20,dx+dw+5,dy+30], 180, 360, fill=(55,40,28), width=4)
    # Door handle
    d.ellipse([dx+dw-18, dy+dh//2-4, dx+dw-10, dy+dh//2+4], fill=(200,170,60))
    # Steps
    for i in range(4):
        sw = dw + i*20
        sx = dx - i*10
        d.rectangle([sx, gy+i*5, sx+sw, gy+i*5+5], fill=(50+i*3,45+i*3,40+i*2))
    
    # Trees
    tree(d, int(W*0.06), gy, 150, 70)
    tree(d, int(W*0.94), gy-10, 160, 75)
    tree(d, int(W*0.14), gy, 100, 50)
    
    # Wrought-iron fence
    for fx in range(0, int(W*0.18), 12):
        d.rectangle([fx, gy-30, fx+2, gy], fill=(35,35,40))
    for fx in range(int(W*0.82), W, 12):
        d.rectangle([fx, gy-30, fx+2, gy], fill=(35,35,40))
    d.line([(0,gy-25),(int(W*0.18),gy-25)], fill=(40,40,45), width=2)
    d.line([(int(W*0.82),gy-25),(W,gy-25)], fill=(40,40,45), width=2)
    
    # Fog
    fog_layer(d, W, gy-20, 50, 30)
    
    save(label(img, "Entrée du Manoir", "Manoir Beaumont — Nuit d'orage"), 'mansion_entrance')

def gen_living_room():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (38,30,28), (22,18,16))
    
    fy = int(H*0.65)
    wood_floor(d, W, H, fy, (32,24,16))
    
    # Wallpaper damask pattern
    for y in range(0, fy, 35):
        for x in range(0, W, 45):
            d.ellipse([x+15,y+10,x+30,y+25], fill=(42,34,30))
    
    # Fireplace (center)
    fx = int(W*0.38)
    fw = int(W*0.24)
    d.rectangle([fx, fy-170, fx+fw, fy], fill=(55,42,32))
    # Fireplace mantel
    d.rectangle([fx-25, fy-180, fx+fw+25, fy-170], fill=(60,48,35))
    d.rectangle([fx-30, fy-185, fx+fw+30, fy-180], fill=(65,52,38))
    # Fire opening
    d.rounded_rectangle([fx+20, fy-130, fx+fw-20, fy-5], radius=10, fill=(12,8,5))
    # Roaring fire
    for _ in range(20):
        fc = random.choice([(255,180,30),(255,140,20),(255,100,15),(255,220,50)])
        fs = random.randint(6,22)
        ffx = fx+40+random.randint(0, fw-80)
        ffy = fy-30-random.randint(0,80)
        d.ellipse([ffx-fs,ffy-fs,ffx+fs,ffy+fs], fill=fc)
    # Fire glow on floor
    for i in range(8):
        r = 80+i*30
        d.ellipse([fx+fw//2-r, fy-r//2, fx+fw//2+r, fy+r//3], fill=(255,140,30, max(8-i, 2)))
    
    # Ornaments on mantel
    d.rectangle([fx+10, fy-205, fx+35, fy-185], fill=(80,65,45), outline=(100,80,50), width=2)  # Clock
    d.rectangle([fx+fw-30, fy-200, fx+fw-15, fy-185], fill=(60,55,50))  # Vase
    
    # Sofa (left)
    d.rounded_rectangle([int(W*0.04), fy-65, int(W*0.32), fy-5], radius=10, fill=(90,30,30))
    d.rounded_rectangle([int(W*0.04), fy-85, int(W*0.09), fy-15], radius=6, fill=(80,25,25))
    d.rounded_rectangle([int(W*0.27), fy-85, int(W*0.32), fy-15], radius=6, fill=(80,25,25))
    # Cushions
    d.rounded_rectangle([int(W*0.10), fy-55, int(W*0.18), fy-30], radius=5, fill=(100,40,35))
    d.rounded_rectangle([int(W*0.19), fy-55, int(W*0.27), fy-30], radius=5, fill=(95,35,30))
    
    # Coffee table
    d.rectangle([int(W*0.12), fy-20, int(W*0.28), fy-8], fill=(48,30,16))
    
    # Large paintings
    d.rectangle([int(W*0.08), 40, int(W*0.25), 155], fill=(55,45,35), outline=(100,80,40), width=4)
    d.rectangle([int(W*0.70), 50, int(W*0.92), 175], fill=(48,40,32), outline=(100,80,40), width=4)
    # Painting subjects (abstract)
    d.ellipse([int(W*0.12), 65, int(W*0.21), 130], fill=(70,50,40))
    d.rectangle([int(W*0.74), 70, int(W*0.88), 155], fill=(40,55,42))
    
    # Side table with lamp (right)
    d.rectangle([int(W*0.75), fy-55, int(W*0.85), fy], fill=(50,32,18))
    d.polygon([(int(W*0.77), fy-75), (int(W*0.83), fy-75), (int(W*0.80), fy-100)], fill=(180,160,100))
    d.rectangle([int(W*0.79), fy-75, int(W*0.81), fy-55], fill=(60,50,35))
    
    chandelier(d, W//2, 25, 150)
    
    # Rug
    d.rounded_rectangle([int(W*0.25), fy+20, int(W*0.75), H-20], radius=5, fill=(80,25,25, 60))
    d.rounded_rectangle([int(W*0.27), fy+25, int(W*0.73), H-25], radius=3, fill=(70,20,20, 40))
    
    save(label(img, "Le Grand Salon", "Atmosphère feutrée"), 'living_room')

def gen_study():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (22,22,38), (14,12,22))
    
    fy = int(H*0.65)
    wood_floor(d, W, H, fy, (24,18,28))
    
    # Bookshelves left & right
    bookshelf(d, 8, 20, int(W*0.24), fy-25)
    bookshelf(d, W-int(W*0.24)-8, 20, int(W*0.24), fy-25)
    
    # Window (center, night)
    wx, wy = int(W*0.40), 15
    ww, wh = int(W*0.20), int(H*0.22)
    d.rectangle([wx-8,wy-5,wx+ww+8,wy+wh+5], fill=(40,35,28), outline=(55,45,32), width=3)
    window_glow(d, wx, wy, ww, wh, (25,30,55))
    # Curtains
    d.rectangle([wx-30, wy-10, wx-5, wy+wh+30], fill=(50,20,20))
    d.rectangle([wx+ww+5, wy-10, wx+ww+30, wy+wh+30], fill=(50,20,20))
    
    # Grand desk
    d.rectangle([int(W*0.28), fy-55, int(W*0.72), fy-15], fill=(55,35,20))
    d.rectangle([int(W*0.28), fy-60, int(W*0.72), fy-55], fill=(65,42,25))  # top edge
    # Desk legs
    d.rectangle([int(W*0.30), fy-15, int(W*0.33), fy+5], fill=(50,30,18))
    d.rectangle([int(W*0.67), fy-15, int(W*0.70), fy+5], fill=(50,30,18))
    # Desk drawers
    for i in range(3):
        dx = int(W*0.32) + i*int(W*0.12)
        d.rectangle([dx, fy-48, dx+int(W*0.10), fy-22], fill=(50,32,18), outline=(45,28,15), width=1)
        d.ellipse([dx+int(W*0.04), fy-38, dx+int(W*0.06), fy-33], fill=(160,140,70))
    
    # Desk lamp
    lx = int(W*0.62)
    d.rectangle([lx, fy-75, lx+6, fy-55], fill=(50,45,35))
    d.polygon([(lx-18, fy-75), (lx+24, fy-75), (lx+3, fy-100)], fill=(40,80,40))
    # Lamp light cone
    for i in range(8):
        a = 25-i*3
        r = 30+i*18
        d.ellipse([lx-r, fy-80-r//3, lx+r+6, fy-50+r//2], fill=(220,200,100, max(a,2)))
    
    # Papers, ink, pen on desk
    for _ in range(5):
        px = int(W*0.33)+random.randint(0, int(W*0.28))
        py = fy-52+random.randint(0,20)
        pw, ph = random.randint(20,35), random.randint(25,45)
        d.rectangle([px,py,px+pw,py+ph], fill=(210+random.randint(-15,0), 200+random.randint(-15,0), 180+random.randint(-15,0)))
    # Ink bottle
    d.rectangle([int(W*0.34), fy-68, int(W*0.36), fy-55], fill=(20,20,40))
    
    # Leather chair
    d.rounded_rectangle([int(W*0.42), fy-25, int(W*0.58), fy+35], radius=8, fill=(55,28,18))
    d.rounded_rectangle([int(W*0.43), fy-45, int(W*0.57), fy-10], radius=10, fill=(60,32,20))
    
    # Globe on stand (right)
    gx, gy_g = int(W*0.85), fy-40
    d.rectangle([gx-3, gy_g+15, gx+3, gy_g+40], fill=(60,50,35))
    d.ellipse([gx-20, gy_g-20, gx+20, gy_g+20], fill=(30,60,45), outline=(80,65,40), width=2)
    
    save(label(img, "Le Bureau d'Étude", "Secrets enfouis"), 'study')

def gen_kitchen():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (30,30,35), (20,18,22))
    
    fy = int(H*0.65)
    # Tiled floor
    tile = 35
    for ty in range(fy, H, tile):
        for tx in range(0, W, tile):
            c = (38,35,33) if (tx//tile+ty//tile)%2==0 else (42,39,37)
            d.rectangle([tx,ty,tx+tile,ty+tile], fill=c)
    
    # Counter left
    d.rectangle([0, fy-65, int(W*0.40), fy], fill=(48,38,28))
    d.rectangle([0, fy-70, int(W*0.40), fy-65], fill=(70,58,45))  # Countertop
    # Sink
    d.rounded_rectangle([int(W*0.15), fy-62, int(W*0.28), fy-45], radius=3, fill=(55,55,60))
    d.rectangle([int(W*0.20), fy-75, int(W*0.23), fy-60], fill=(70,70,75))  # Faucet
    
    # Stove (right-center)
    d.rectangle([int(W*0.48), fy-85, int(W*0.72), fy], fill=(55,53,50))
    d.rectangle([int(W*0.48), fy-90, int(W*0.72), fy-85], fill=(60,58,55))
    for bx, by in [(0.53, fy-78), (0.63, fy-78), (0.53, fy-55), (0.63, fy-55)]:
        d.ellipse([int(W*bx)-12, by-12, int(W*bx)+12, by+12], fill=(38,38,40), outline=(70,70,72), width=2)
    # Oven door
    d.rectangle([int(W*0.50), fy-35, int(W*0.70), fy-5], fill=(50,48,45), outline=(60,58,55), width=2)
    d.rectangle([int(W*0.52), fy-30, int(W*0.68), fy-28], fill=(80,78,75))  # Handle
    
    # Hanging pots & pans
    d.line([(int(W*0.1),8),(int(W*0.35),8)], fill=(90,80,60), width=4)
    for i, px in enumerate([0.12, 0.18, 0.24, 0.30]):
        h_pot = 30+random.randint(0,20)
        d.line([(int(W*px),8),(int(W*px),8+h_pot)], fill=(80,70,55), width=2)
        c = random.choice([(90,75,55),(70,70,75),(100,85,60)])
        d.arc([int(W*px)-15, 8+h_pot-5, int(W*px)+15, 8+h_pot+20], 0, 180, fill=c, width=4)
    
    # Cabinets above
    for i in range(5):
        cx = int(W*0.02) + i*int(W*0.195)
        d.rectangle([cx, 15, cx+int(W*0.17), 110], fill=(48,35,22), outline=(40,28,18), width=2)
        d.ellipse([cx+int(W*0.14), 58, cx+int(W*0.15), 68], fill=(160,140,70))
    
    # Knife rack on wall
    kx = int(W*0.78)
    d.rectangle([kx, 50, kx+70, 56], fill=(55,42,30))
    for i in range(5):
        d.polygon([(kx+8+i*14, 56), (kx+5+i*14, 120), (kx+11+i*14, 120)], fill=(180,180,190))
        d.rectangle([kx+5+i*14, 56, kx+11+i*14, 68], fill=(70,50,30))
    
    # Basket with vegetables
    bx = int(W*0.78)
    d.rounded_rectangle([bx, fy-45, bx+80, fy-10], radius=5, fill=(90,70,40))
    d.ellipse([bx+5, fy-42, bx+25, fy-28], fill=(180,30,20))  # Tomato
    d.ellipse([bx+20, fy-40, bx+45, fy-25], fill=(60,130,40))  # Lettuce
    
    # Warm lantern on counter
    d.rectangle([int(W*0.05), fy-90, int(W*0.08), fy-70], fill=(60,50,30))
    d.ellipse([int(W*0.04), fy-100, int(W*0.09), fy-88], fill=(240,200,80))
    for i in range(4):
        r = 15+i*12
        d.ellipse([int(W*0.065)-r, fy-94-r//2, int(W*0.065)+r, fy-88+r//3], fill=(240,200,80, max(15-i*3,2)))
    
    save(label(img, "La Cuisine", "Où se cachent les indices"), 'kitchen')

def gen_garden():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (5,8,25), (10,18,12))
    stars(d, W, H, 150)
    moon(d, 130, 55, 35)
    
    gy = int(H*0.58)
    # Ground
    d.rectangle([0,gy,W,H], fill=(14,28,14))
    for _ in range(500):
        gx = random.randint(0,W)
        gy2 = random.randint(gy,H)
        gh = random.randint(4,22)
        c = (18+random.randint(-3,5), 40+random.randint(-5,8), 15+random.randint(-3,3))
        d.line([(gx,gy2),(gx+random.randint(-3,3),gy2-gh)], fill=c, width=1)
    
    # Stone path
    d.polygon([(W*0.42,H),(W*0.58,H),(W*0.54,gy),(W*0.46,gy)], fill=(45,42,35))
    for _ in range(80):
        px = random.randint(int(W*0.42),int(W*0.58))
        py = random.randint(gy,H)
        d.ellipse([px-3,py-2,px+3,py+2], fill=(50+random.randint(-5,5),47,40))
    
    # Hedges
    for hx, hw in [(0.02, 0.20), (0.78, 0.20)]:
        d.rounded_rectangle([int(W*hx), gy-45, int(W*(hx+hw)), gy], radius=18, fill=(12,38,12))
        d.rounded_rectangle([int(W*hx)+5, gy-40, int(W*(hx+hw))-5, gy-5], radius=12, fill=(15,42,15))
    
    # Fountain (center)
    d.ellipse([int(W*0.37), gy-10, int(W*0.63), gy+28], fill=(48,48,55), outline=(60,60,68), width=3)
    d.ellipse([int(W*0.42), gy-5, int(W*0.58), gy+18], fill=(25,35,55))  # Water
    d.rectangle([int(W*0.48), gy-50, int(W*0.52), gy-5], fill=(58,58,65))
    # Water spout
    d.ellipse([int(W*0.47), gy-55, int(W*0.53), gy-45], fill=(55,55,62))
    
    # Trees
    tree(d, int(W*0.08), gy, 160, 70)
    tree(d, int(W*0.92), gy-5, 170, 75)
    tree(d, int(W*0.50), gy-20, 80, 45)  # smaller ornamental
    
    # Bench
    d.rectangle([int(W*0.65), gy-25, int(W*0.76), gy-15], fill=(50,35,20))
    d.rectangle([int(W*0.66), gy-15, int(W*0.68), gy], fill=(45,30,18))
    d.rectangle([int(W*0.73), gy-15, int(W*0.75), gy], fill=(45,30,18))
    
    # Statue
    d.rectangle([int(W*0.28), gy-20, int(W*0.32), gy], fill=(58,56,54))
    d.ellipse([int(W*0.285), gy-55, int(W*0.315), gy-20], fill=(140,138,132))
    d.ellipse([int(W*0.29), gy-68, int(W*0.31), gy-52], fill=(145,142,136))
    
    # Rose bushes with hints of red
    for rx in [0.22, 0.34, 0.66, 0.78]:
        d.ellipse([int(W*rx)-15, gy-20, int(W*rx)+15, gy+5], fill=(15,35,15))
        for _ in range(3):
            bx = int(W*rx)+random.randint(-8,3)
            by = gy-15+random.randint(-3,0)
            d.ellipse([bx, by, bx+6, by+6], fill=(180,30,30))
    
    fog_layer(d, W, gy-15, 60, 35)
    
    save(label(img, "Le Jardin Secret", "Mystères nocturnes"), 'garden')

def gen_bedroom():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (28,22,32), (16,12,20))
    
    fy = int(H*0.65)
    wood_floor(d, W, H, fy, (28,22,28))
    
    # Wallpaper subtle stripe
    for x in range(0, W, 20):
        c = 28 if (x//20)%2==0 else 30
        d.rectangle([x, 0, x+18, fy], fill=(c, c-5, c+3))
    
    # Crown molding
    d.rectangle([0, 0, W, 8], fill=(35,30,28))
    
    # Bed (large, ornate)
    d.rounded_rectangle([int(W*0.08), fy-85, int(W*0.55), fy], radius=6, fill=(95,38,35))
    # Headboard
    d.rounded_rectangle([int(W*0.06), fy-150, int(W*0.12), fy-20], radius=12, fill=(60,32,18))
    # Decorative headboard top
    d.ellipse([int(W*0.05), fy-170, int(W*0.13), fy-140], fill=(65,35,20))
    # Pillows
    d.rounded_rectangle([int(W*0.13), fy-95, int(W*0.28), fy-65], radius=8, fill=(210,205,195))
    d.rounded_rectangle([int(W*0.28), fy-92, int(W*0.42), fy-68], radius=8, fill=(200,195,185))
    # Sheets/blanket
    d.rounded_rectangle([int(W*0.13), fy-68, int(W*0.53), fy-8], radius=4, fill=(180,170,155))
    # Folded blanket
    d.rounded_rectangle([int(W*0.13), fy-40, int(W*0.53), fy-15], radius=3, fill=(90,35,32))
    
    # Nightstand
    d.rectangle([int(W*0.58), fy-55, int(W*0.68), fy], fill=(52,32,18))
    d.rectangle([int(W*0.59), fy-48, int(W*0.67), fy-28], fill=(48,28,15), outline=(42,24,12))
    d.ellipse([int(W*0.62), fy-40, int(W*0.64), fy-36], fill=(150,130,60))
    # Lamp
    d.rectangle([int(W*0.615), fy-72, int(W*0.645), fy-55], fill=(75,65,50))
    d.polygon([(int(W*0.59), fy-72), (int(W*0.67), fy-72), (int(W*0.63), fy-100)], fill=(200,175,110))
    # Lamp glow
    for i in range(5):
        r = 20+i*15
        d.ellipse([int(W*0.63)-r, fy-85-r//2, int(W*0.63)+r, fy-60+r//3], fill=(220,190,100, max(15-i*3,2)))
    
    # Wardrobe (large)
    d.rectangle([int(W*0.74), fy-175, int(W*0.96), fy], fill=(48,30,16), outline=(38,22,10), width=2)
    d.line([(int(W*0.85), fy-170),(int(W*0.85), fy+5)], fill=(38,22,10), width=2)
    d.ellipse([int(W*0.83), fy-95, int(W*0.84), fy-85], fill=(150,130,60))
    d.ellipse([int(W*0.86), fy-95, int(W*0.87), fy-85], fill=(150,130,60))
    # Wardrobe top decoration
    d.rectangle([int(W*0.73), fy-180, int(W*0.97), fy-175], fill=(55,35,20))
    
    # Mirror
    d.ellipse([int(W*0.34), 25, int(W*0.50), 150], fill=(70,75,90), outline=(90,70,40), width=4)
    # Reflection hint
    d.ellipse([int(W*0.38), 45, int(W*0.46), 115], fill=(75,80,95))
    
    # Window with curtains
    window_glow(d, int(W*0.62), 25, 80, 100, (25,30,55))
    d.rectangle([int(W*0.60), 15, int(W*0.64), 140], fill=(100,28,28))
    d.rectangle([int(W*0.72), 15, int(W*0.76), 140], fill=(100,28,28))
    # Curtain rod
    d.line([(int(W*0.58), 15),(int(W*0.78), 15)], fill=(120,90,40), width=3)
    
    # Rug
    d.rounded_rectangle([int(W*0.15), fy+15, int(W*0.55), H-15], radius=5, fill=(70,28,60, 50))
    
    save(label(img, "La Chambre", "Secrets intimes"), 'bedroom')

def gen_office():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (25,25,40), (15,13,22))
    
    fy = int(H*0.65)
    wood_floor(d, W, H, fy, (22,18,30))
    
    # Wall panels
    for i in range(6):
        px = int(W*0.02)+i*int(W*0.17)
        d.rectangle([px, 8, px+int(W*0.14), fy-8], fill=(28,28,44), outline=(34,34,50), width=1)
    
    # Large desk
    d.rectangle([int(W*0.18), fy-58, int(W*0.78), fy-18], fill=(52,34,20))
    d.rectangle([int(W*0.18), fy-63, int(W*0.78), fy-58], fill=(62,40,25))
    
    # Monitor
    d.rectangle([int(W*0.52), fy-115, int(W*0.72), fy-63], fill=(35,35,42), outline=(50,50,58), width=2)
    d.rectangle([int(W*0.54), fy-110, int(W*0.70), fy-68], fill=(25,45,75))
    # Screen content
    for sl in range(int(H*0.32), int(H*0.54), 8):
        d.line([(int(W*0.55), sl),(int(W*0.69), sl)], fill=(30,50,80), width=1)
    d.rectangle([int(W*0.60), fy-63, int(W*0.64), fy-58], fill=(45,45,50))
    
    # Keyboard
    d.rectangle([int(W*0.54), fy-55, int(W*0.68), fy-42], fill=(28,28,32), outline=(38,38,42))
    
    # Filing cabinet
    d.rectangle([int(W*0.84), fy-110, int(W*0.96), fy], fill=(58,58,62), outline=(48,48,52), width=2)
    for i in range(3):
        cy = fy-100+i*32
        d.rectangle([int(W*0.85), cy, int(W*0.95), cy+28], fill=(54,54,58), outline=(62,62,66))
        d.ellipse([int(W*0.89), cy+11, int(W*0.91), cy+17], fill=(150,130,70))
    
    # Office chair
    d.ellipse([int(W*0.36), fy-10, int(W*0.52), fy+25], fill=(35,35,40))
    d.rounded_rectangle([int(W*0.38), fy-50, int(W*0.50), fy-5], radius=8, fill=(40,40,48))
    
    # Clock
    cx_c, cy_c = int(W*0.48), 45
    d.ellipse([cx_c-28, cy_c-28, cx_c+28, cy_c+28], fill=(48,42,38), outline=(90,70,40), width=3)
    d.line([(cx_c, cy_c),(cx_c, cy_c-18)], fill=(200,180,80), width=2)
    d.line([(cx_c, cy_c),(cx_c+12, cy_c-5)], fill=(200,180,80), width=2)
    
    # Papers on desk
    for _ in range(4):
        px = int(W*0.22)+random.randint(0, int(W*0.22))
        py = fy-55+random.randint(0,18)
        d.rectangle([px,py,px+28,py+38], fill=(205+random.randint(-10,0), 195+random.randint(-10,0), 175+random.randint(-10,0)))
    
    # Coffee mug
    d.rounded_rectangle([int(W*0.42), fy-52, int(W*0.45), fy-35], radius=3, fill=(180,160,140))
    d.arc([int(W*0.45), fy-50, int(W*0.47), fy-38], -90, 90, fill=(180,160,140), width=2)
    
    # Photos on wall
    for px, py in [(0.22, 30), (0.30, 35)]:
        d.rectangle([int(W*px), py, int(W*px)+50, py+40], fill=(50,45,40), outline=(70,60,45), width=2)
    
    save(label(img, "Bureau du Commissaire", "QG d'enquête"), 'office')


# ═══════════════════════════════════════════════════════
# CASE 2: Le Poison du Maestro
# ═══════════════════════════════════════════════════════

def gen_theatre_entrance():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (40,15,15), (18,8,12))
    
    fy = int(H*0.65)
    # Marble floor
    tile = 50
    for ty in range(fy, H, tile):
        for tx in range(0, W, tile):
            c = (48,44,42) if (tx//tile+ty//tile)%2==0 else (55,50,48)
            d.rectangle([tx,ty,tx+tile,ty+tile], fill=c)
    
    # Grand pillars
    for px in [0.08, 0.25, 0.75, 0.92]:
        x = int(W*px)
        d.rectangle([x-18, 15, x+18, fy], fill=(52,42,35))
        d.rectangle([x-24, 15, x+24, 28], fill=(58,48,40))
        d.rectangle([x-24, fy-12, x+24, fy], fill=(58,48,40))
        # Pillar flutes
        for f in range(-12, 14, 6):
            d.line([(x+f, 28),(x+f, fy-12)], fill=(48,38,32), width=1)
    
    # Red curtains draped
    for side in [0, 1]:
        x = 0 if side==0 else int(W*0.88)
        cw = int(W*0.12)
        d.rectangle([x, 0, x+cw, fy+20], fill=(130,22,22))
        for f in range(8):
            fx = x + f*(cw//8)
            d.line([(fx,0),(fx,fy+20)], fill=(110,18,18), width=2)
        # Tassels
        d.ellipse([x+cw//2-8, fy-5, x+cw//2+8, fy+5], fill=(180,150,60))
    
    # Grand staircase
    for i in range(8):
        sy = fy - i*10
        sw = int(W*0.42) - i*18
        sx = (W-sw)//2
        d.rectangle([sx, sy, sx+sw, sy+10], fill=(55+i*2, 45+i*2, 40+i))
        d.line([(sx,sy),(sx+sw,sy)], fill=(65+i*2,55+i*2,50+i), width=1)
    
    # Chandelier
    chandelier(d, W//2, 18, 180)
    
    # Playbill poster
    d.rectangle([int(W*0.40), 50, int(W*0.60), 170], fill=(55,45,35), outline=(100,80,40), width=3)
    d.rectangle([int(W*0.42), 60, int(W*0.58), 160], fill=(35,30,25))
    try:
        font = ImageFont.truetype('arial.ttf', 11)
        d.text((int(W*0.44), 90), "LE MAESTRO", fill=(200,170,60), font=font)
        d.text((int(W*0.44), 110), "CE SOIR", fill=(180,160,130), font=font)
    except:
        pass
    
    # Velvet rope
    for rx in [0.35, 0.65]:
        d.rectangle([int(W*rx)-3, fy-35, int(W*rx)+3, fy], fill=(160,140,60))
        d.ellipse([int(W*rx)-6, fy-38, int(W*rx)+6, fy-30], fill=(180,160,70))
    d.line([(int(W*0.35), fy-30),(int(W*0.65), fy-30)], fill=(140,25,25), width=4)
    
    save(label(img, "Hall du Théâtre", "Le Poison du Maestro"), 'theatre_entrance')

def gen_theatre_stage():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (15,12,28), (8,6,14))
    
    fy = int(H*0.52)
    # Stage floor (polished wood)
    d.rectangle([int(W*0.08), fy, int(W*0.92), H], fill=(55,38,22))
    for y in range(fy, H, 3):
        c = 55+random.randint(-3,3)
        d.line([(int(W*0.08),y),(int(W*0.92),y)], fill=(c,c-15,c-30), width=1)
    for x in range(int(W*0.08), int(W*0.92), 35):
        d.line([(x,fy),(x,H)], fill=(50,34,18), width=1)
    
    # Heavy curtains sides
    for side in [0, 1]:
        x = 0 if side==0 else int(W*0.78)
        cw = int(W*0.22) if side==0 else W-x
        d.rectangle([x,0,x+cw,H], fill=(140,20,20))
        for f in range(0, cw, cw//10+1):
            d.line([(x+f,0),(x+f,H)], fill=(120,15,15), width=2)
    
    # Curtain tops (valance)
    d.rectangle([0, 0, W, 25], fill=(150,25,25))
    d.rectangle([0, 25, W, 30], fill=(180,150,60))  # Gold trim
    
    # Back wall/cyclorama
    d.rectangle([int(W*0.08),0,int(W*0.92),fy], fill=(15,12,22))
    
    # Grand piano
    d.ellipse([int(W*0.15), fy+10, int(W*0.42), fy+80], fill=(12,10,8))
    d.rectangle([int(W*0.15), fy+30, int(W*0.18), fy+100], fill=(12,10,8))  # leg
    d.rectangle([int(W*0.38), fy+30, int(W*0.41), fy+100], fill=(12,10,8))  # leg
    # Piano lid
    d.line([(int(W*0.15),fy+15),(int(W*0.20),fy-10)], fill=(18,15,12), width=3)
    
    # Music stands
    for mx in [0.50, 0.60, 0.70]:
        x = int(W*mx)
        d.rectangle([x-2, fy+10, x+2, fy+60], fill=(30,30,35))
        d.rectangle([x-16, fy-5, x+16, fy+15], fill=(35,35,40))
        # Sheet music
        d.rectangle([x-12, fy-2, x+12, fy+12], fill=(200,195,180))
    
    # Conductor's podium
    d.rectangle([int(W*0.44), fy+30, int(W*0.56), fy+45], fill=(50,35,20))
    d.rectangle([int(W*0.45), fy+20, int(W*0.55), fy+30], fill=(55,40,25))
    
    # Spotlight beams
    for sx, alpha in [(0.30, 15), (0.50, 25), (0.70, 15)]:
        d.polygon([(int(W*sx)-5,0),(int(W*sx)+5,0),(int(W*sx)+70,fy),(int(W*sx)-70,fy)],
                  fill=(255,248,210, alpha))
    
    # Orchestra chairs (rows)
    for row in range(2):
        for cx in range(int(W*0.22), int(W*0.78), 40):
            cy = fy+55+row*30
            d.rectangle([cx, cy, cx+22, cy+22], fill=(45,28,15))
    
    save(label(img, "Scène du Théâtre", "Lieu du drame"), 'theatre_stage')

def gen_backstage():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (22,20,25), (12,10,15))
    
    fy = int(H*0.65)
    d.rectangle([0,fy,W,H], fill=(28,25,22))
    
    # Rough concrete walls
    stone_wall(d, W, H, 0, fy, (22,20,24))
    
    # Exposed pipes
    for py in [6, 18, 30]:
        d.line([(0,py),(W,py)], fill=(60,60,65), width=5)
        for jx in range(0, W, 120):
            d.rectangle([jx, py-8, jx+8, py+12], fill=(58,58,62))
    
    # Costume rack
    d.line([(int(W*0.03),fy-150),(int(W*0.32),fy-150)], fill=(65,65,70), width=4)
    d.rectangle([int(W*0.05),fy-150,int(W*0.06),fy], fill=(55,55,60))
    d.rectangle([int(W*0.29),fy-150,int(W*0.30),fy], fill=(55,55,60))
    # Costumes
    costumes = [(140,22,22),(22,55,140),(110,85,22),(22,110,55),(90,22,110),(140,100,22)]
    for i, c in enumerate(costumes):
        cx = int(W*0.07)+i*32
        d.polygon([(cx,fy-145),(cx-14,fy-50),(cx+14,fy-50)], fill=c)
        d.polygon([(cx-14,fy-50),(cx-18,fy-20),(cx+18,fy-20),(cx+14,fy-50)], fill=(c[0]-15,c[1]-15,c[2]-15))
    
    # Dressing table with lights
    d.rectangle([int(W*0.48), fy-55, int(W*0.78), fy], fill=(48,32,18))
    # Mirror
    d.rectangle([int(W*0.50), 60, int(W*0.76), 220], fill=(75,80,95), outline=(90,70,40), width=3)
    # Light bulbs around mirror
    for by in range(70, 220, 22):
        d.ellipse([int(W*0.48)-2, by-5, int(W*0.50)+2, by+5], fill=(255,240,180))
        d.ellipse([int(W*0.76)-2, by-5, int(W*0.78)+2, by+5], fill=(255,240,180))
    for bx in range(int(W*0.52), int(W*0.74), 22):
        d.ellipse([bx-5, 55, bx+5, 65], fill=(255,240,180))
    
    # Makeup items
    for mx in range(int(W*0.52), int(W*0.72), 18):
        mh = random.randint(12,25)
        mc = random.choice([(180,50,50),(50,50,150),(180,140,60),(60,140,60)])
        d.rectangle([mx, fy-52, mx+10, fy-52+mh], fill=mc)
    
    # Props: mask, sword, hat
    d.ellipse([int(W*0.82), fy-60, int(W*0.92), fy-35], fill=(200,180,50))  # Golden mask
    d.ellipse([int(W*0.84), fy-55, int(W*0.90), fy-42], fill=(180,160,40))
    d.rectangle([int(W*0.82), fy-30, int(W*0.90), fy-5], fill=(50,50,55))  # Prop box
    
    # Stacked crates
    d.rectangle([int(W*0.36), fy-70, int(W*0.46), fy], fill=(60,50,35), outline=(50,40,28), width=2)
    d.rectangle([int(W*0.38), fy-105, int(W*0.44), fy-70], fill=(58,48,32), outline=(48,38,25), width=2)
    
    # Warning sign
    d.rectangle([int(W*0.92), 80, int(W*0.98), 110], fill=(200,180,30))
    
    save(label(img, "Les Coulisses", "Arrière-scène du théâtre"), 'backstage')

def gen_theatre_office():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (35,20,20), (18,12,14))
    
    fy = int(H*0.65)
    wood_floor(d, W, H, fy, (30,20,15))
    
    # Rich wallpaper
    for y in range(0, fy, 30):
        for x in range(0, W, 40):
            d.rectangle([x+14,y+8,x+26,y+22], fill=(38,24,22))
    
    # Theater posters on wall
    posters = [(0.05, 30, 100, 140), (0.20, 40, 90, 130), (0.75, 35, 95, 135)]
    for px, py, pw, ph in posters:
        d.rectangle([int(W*px),py,int(W*px)+pw,py+ph], fill=(50,40,32), outline=(100,80,40), width=3)
        d.rectangle([int(W*px)+5,py+5,int(W*px)+pw-5,py+ph-5], fill=(40,30,25))
    
    # Large mahogany desk
    d.rectangle([int(W*0.25), fy-55, int(W*0.75), fy-15], fill=(58,32,18))
    d.rectangle([int(W*0.25), fy-60, int(W*0.75), fy-55], fill=(68,38,22))
    
    # Desk items
    # Typewriter
    d.rectangle([int(W*0.55), fy-82, int(W*0.70), fy-55], fill=(30,30,32))
    d.rectangle([int(W*0.56), fy-78, int(W*0.69), fy-65], fill=(35,35,38))
    d.rectangle([int(W*0.58), fy-92, int(W*0.67), fy-82], fill=(210,200,180))  # Paper
    
    # Scripts/papers
    for _ in range(3):
        px = int(W*0.30)+random.randint(0,int(W*0.18))
        py = fy-52+random.randint(0,15)
        d.rectangle([px,py,px+25,py+35], fill=(205,195,175))
    
    # Whiskey glass
    d.rectangle([int(W*0.45), fy-48, int(W*0.47), fy-35], fill=(120,80,30, 80))
    
    # Bookshelf
    bookshelf(d, int(W*0.82), 25, int(W*0.16), fy-30)
    
    # Velvet chair
    d.rounded_rectangle([int(W*0.40), fy-30, int(W*0.56), fy+25], radius=8, fill=(120,30,30))
    d.rounded_rectangle([int(W*0.41), fy-50, int(W*0.55), fy-15], radius=10, fill=(130,35,35))
    
    # Window with city view
    window_glow(d, int(W*0.42), 25, 90, 100, (20,25,45))
    d.rectangle([int(W*0.40), 18, int(W*0.43), 135], fill=(90,25,25))
    d.rectangle([int(W*0.55), 18, int(W*0.58), 135], fill=(90,25,25))
    
    # Award/trophy
    d.rectangle([int(W*0.05), fy-40, int(W*0.08), fy], fill=(50,38,25))
    d.ellipse([int(W*0.04), fy-55, int(W*0.09), fy-40], fill=(200,170,50))
    
    save(label(img, "Bureau du Directeur", "Théâtre Royal"), 'theatre_office')


# ═══════════════════════════════════════════════════════
# CASE 3: Meurtre au Phare
# ═══════════════════════════════════════════════════════

def gen_island_dock():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (12,18,48), (30,50,70))
    stars(d, W, int(H*0.35), 50)
    
    # Sea
    sea_y = int(H*0.48)
    d.rectangle([0,sea_y,W,H], fill=(12,25,50))
    for i in range(25):
        wy = sea_y + i*8
        pts = [(x, wy + int(4*math.sin(x/25+i*0.7))) for x in range(0, W+20, 15)]
        if len(pts) > 1:
            d.line(pts, fill=(18,32,58), width=2)
    # Foam
    for _ in range(30):
        fx = random.randint(0, W)
        fy_f = sea_y + random.randint(0, 20)
        d.ellipse([fx-8, fy_f-2, fx+8, fy_f+2], fill=(40,55,75))
    
    # Dock
    dock_y = int(H*0.58)
    d.polygon([(int(W*0.25),dock_y),(int(W*0.80),dock_y),(int(W*0.75),H),(int(W*0.20),H)], fill=(52,38,22))
    for i in range(12):
        dy = dock_y + i*((H-dock_y)//12)
        d.line([(int(W*0.22),dy),(int(W*0.78),dy)], fill=(45,32,18), width=2)
    # Planks
    for x in range(int(W*0.25), int(W*0.78), 25):
        d.line([(x,dock_y),(x-5,H)], fill=(48,35,20), width=1)
    
    # Dock posts with rope
    for px in [0.28, 0.72]:
        d.rectangle([int(W*px)-5, dock_y-35, int(W*px)+5, dock_y+15], fill=(48,34,18))
        d.ellipse([int(W*px)-8, dock_y-40, int(W*px)+8, dock_y-30], fill=(52,38,22))
        # Rope coils
        d.arc([int(W*px)-12, dock_y-30, int(W*px)+12, dock_y-15], 0, 360, fill=(130,110,60), width=3)
    
    # Small fishing boat
    d.polygon([(int(W*0.05),H-30),(int(W*0.02),H-8),(int(W*0.22),H-8),(int(W*0.19),H-30)], fill=(55,40,25))
    d.line([(int(W*0.12),H-50),(int(W*0.12),H-30)], fill=(60,45,28), width=3)
    
    # Lighthouse in distance
    lx = int(W*0.88)
    d.rectangle([lx-15, 50, lx+15, sea_y], fill=(195,190,180))
    # Red stripe
    d.rectangle([lx-15, 90, lx+15, 120], fill=(180,30,30))
    d.rectangle([lx-15, 160, lx+15, 190], fill=(180,30,30))
    d.polygon([(lx-20, 50),(lx, 20),(lx+20, 50)], fill=(185,30,30))
    # Light beam
    d.polygon([(lx, 25),(W, sea_y*0.2),(W, sea_y*0.45)], fill=(255,250,200, 10))
    d.polygon([(lx, 25),(0, sea_y*0.1),(0, sea_y*0.35)], fill=(255,250,200, 6))
    
    # Seagull silhouettes
    for gx, gy in [(200,80),(350,60),(600,90)]:
        d.line([(gx-8,gy),(gx,gy-5),(gx+8,gy)], fill=(60,70,90), width=2)
    
    fog_layer(d, W, sea_y-10, 35, 20)
    
    save(label(img, "Quai de l'Île", "Embarquement immédiat"), 'island_dock')

def gen_lighthouse():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (8,12,32), (22,28,38))
    stars(d, W, int(H*0.40), 80)
    moon(d, W-100, 55, 28)
    
    gy = int(H*0.75)
    # Rocky ground
    d.rectangle([0,gy,W,H], fill=(38,36,33))
    for _ in range(25):
        rx = random.randint(0,W)
        ry = random.randint(gy,H)
        rr = random.randint(10,35)
        c = (42+random.randint(-5,5), 40+random.randint(-5,5), 36+random.randint(-5,5))
        d.ellipse([rx-rr,ry-rr//2,rx+rr,ry+rr//2], fill=c)
    
    # Sea behind
    d.rectangle([0,int(H*0.52),W,gy], fill=(12,22,48))
    for i in range(15):
        wy = int(H*0.52)+i*6
        d.line([(0,wy),(W,wy+2)], fill=(15,25,52), width=1)
    
    # Lighthouse tower (centered, imposing)
    tw = int(W*0.14)
    tx = W//2 - tw//2
    ly = int(H*0.12)
    d.rectangle([tx, ly, tx+tw, gy], fill=(190,185,175))
    # Red stripes
    stripe_h = (gy-ly)//6
    for i in range(0, 6, 2):
        sy = ly + i*stripe_h
        d.rectangle([tx, sy, tx+tw, sy+stripe_h], fill=(175,30,30))
    # Stone texture
    for row in range(ly, gy, 12):
        offset = 6 if (row//12)%2 else 0
        for col in range(tx, tx+tw, 18):
            d.rectangle([col+offset, row, col+offset+16, row+10], outline=(185,180,172), width=1)
    
    # Lantern room
    lr = int(H*0.08)
    d.rectangle([tx-12, lr, tx+tw+12, ly], fill=(48,48,52))
    d.rectangle([tx-8, lr+4, tx+tw+8, ly-2], fill=(200,200,160, 70))  # Glass
    # Gallery railing
    d.rectangle([tx-18, ly, tx+tw+18, ly+5], fill=(50,50,55))
    for rx in range(tx-16, tx+tw+16, 10):
        d.rectangle([rx, ly-15, rx+2, ly], fill=(48,48,52))
    d.line([(tx-16, ly-15),(tx+tw+16, ly-15)], fill=(50,50,55), width=2)
    
    # Light beams
    d.polygon([(tx+tw//2, lr+5),(0,0),(int(W*0.25),0)], fill=(255,250,200, 10))
    d.polygon([(tx+tw//2, lr+5),(W,int(H*0.15)),(W,0)], fill=(255,250,200, 8))
    
    # Door
    d.rounded_rectangle([tx+tw//2-18, gy-55, tx+tw//2+18, gy], radius=18, fill=(55,38,22))
    d.ellipse([tx+tw//2+10, gy-32, tx+tw//2+14, gy-28], fill=(180,150,60))
    
    # Steps
    for s in range(3):
        d.rectangle([tx+tw//2-25-s*5, gy+s*4, tx+tw//2+25+s*5, gy+s*4+4], fill=(50+s*3,48+s*3,45+s*2))
    
    # Wild grass at base
    for _ in range(60):
        gx = random.randint(0,W)
        d.line([(gx,gy),(gx+random.randint(-5,5),gy-random.randint(10,25))], fill=(25,45,25), width=1)
    
    save(label(img, "Le Phare", "Sentinelle isolée"), 'lighthouse')

def gen_lighthouse_top():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (5,10,30), (15,30,55))
    stars(d, W, int(H*0.30), 100)
    moon(d, W-90, 45, 25)
    
    # Sea/horizon panorama
    sea_y = int(H*0.45)
    d.rectangle([0,sea_y,W,H], fill=(8,18,42))
    for i in range(30):
        wy = sea_y + i*6
        for x in range(0, W, 45):
            d.line([(x,wy),(x+25,wy+random.randint(-2,2))], fill=(12,22,48), width=1)
    
    # Island/coast in far distance
    d.polygon([(0,sea_y+40),(int(W*0.15),sea_y+20),(int(W*0.30),sea_y+35),(int(W*0.35),sea_y+40)], fill=(20,28,18))
    
    # Metal railing (foreground)
    ry = int(H*0.82)
    d.rectangle([0,ry,W,ry+6], fill=(55,55,60))
    for rx in range(0, W, 28):
        d.rectangle([rx, ry-35, rx+3, ry], fill=(50,50,55))
    d.line([(0,ry-35),(W,ry-35)], fill=(55,55,60), width=2)
    d.line([(0,ry-18),(W,ry-18)], fill=(53,53,58), width=1)
    
    # Glass panels (window frame)
    for i in range(6):
        x = i * W // 5
        d.line([(x,0),(x,ry)], fill=(45,45,50, 100), width=3)
    d.line([(0,sea_y),(W,sea_y)], fill=(45,45,50, 60), width=2)
    
    # Lens mechanism (center, large)
    cx, cy = W//2, int(H*0.58)
    # Outer ring
    d.ellipse([cx-75, cy-75, cx+75, cy+75], outline=(150,145,130), width=5)
    d.ellipse([cx-55, cy-55, cx+55, cy+55], outline=(160,155,140), width=4)
    # Glass panels of Fresnel lens
    for angle in range(0, 360, 30):
        x1 = cx + int(55*math.cos(math.radians(angle)))
        y1 = cy + int(55*math.sin(math.radians(angle)))
        x2 = cx + int(75*math.cos(math.radians(angle)))
        y2 = cy + int(75*math.sin(math.radians(angle)))
        d.line([(x1,y1),(x2,y2)], fill=(140,135,120), width=2)
    # Inner light source
    d.ellipse([cx-30, cy-30, cx+30, cy+30], fill=(255,250,200, 80))
    d.ellipse([cx-15, cy-15, cx+15, cy+15], fill=(255,255,220))
    # Glow
    for i in range(8):
        r = 30+i*15
        d.ellipse([cx-r, cy-r, cx+r, cy+r], fill=(255,250,200, max(15-i*2, 2)))
    
    # Metal floor texture
    d.rectangle([0, ry+6, W, H], fill=(40,40,44))
    for x in range(0, W, 20):
        d.line([(x,ry+6),(x,H)], fill=(42,42,46), width=1)
    
    save(label(img, "Sommet du Phare", "Vue sur l'océan"), 'lighthouse_top')

def gen_keeper_house():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (28,25,30), (18,15,20))
    
    fy = int(H*0.65)
    wood_floor(d, W, H, fy, (32,26,20))
    stone_wall(d, W, H, 0, fy, (28,26,30))
    
    # Fireplace
    fx = int(W*0.58)
    fw = 160
    d.rectangle([fx, fy-130, fx+fw, fy], fill=(48,42,38))
    d.rectangle([fx-15, fy-138, fx+fw+15, fy-130], fill=(55,48,42))
    d.rectangle([fx+18, fy-95, fx+fw-18, fy-5], fill=(10,8,5))
    for _ in range(12):
        fc = random.choice([(255,170,25),(255,120,15),(255,200,40)])
        fs = random.randint(5,18)
        ffx = fx+35+random.randint(0,fw-70)
        ffy = fy-25-random.randint(0,55)
        d.ellipse([ffx-fs,ffy-fs,ffx+fs,ffy+fs], fill=fc)
    # Fire glow
    for i in range(6):
        r = 50+i*25
        d.ellipse([fx+fw//2-r, fy-r//2, fx+fw//2+r, fy+r//3], fill=(255,130,25, max(10-i*2, 2)))
    
    # Rustic table
    d.rectangle([int(W*0.08), fy-48, int(W*0.50), fy-18], fill=(48,34,18))
    d.rectangle([int(W*0.08), fy-52, int(W*0.50), fy-48], fill=(55,40,22))
    d.rectangle([int(W*0.10), fy-18, int(W*0.12), fy], fill=(45,30,16))
    d.rectangle([int(W*0.46), fy-18, int(W*0.48), fy], fill=(45,30,16))
    
    # Oil lamp on table
    d.rectangle([int(W*0.28), fy-72, int(W*0.32), fy-48], fill=(55,48,30))
    d.ellipse([int(W*0.275), fy-88, int(W*0.325), fy-70], fill=(255,230,110))
    for i in range(4):
        r = 12+i*10
        d.ellipse([int(W*0.30)-r, fy-80-r//2, int(W*0.30)+r, fy-70+r//3], fill=(255,220,100, max(18-i*4, 2)))
    
    # Ship wheel on wall
    cx_w, cy_w = int(W*0.30), 85
    d.ellipse([cx_w-40, cy_w-40, cx_w+40, cy_w+40], outline=(80,60,30), width=5)
    for angle in range(0, 360, 45):
        sx = cx_w + int(35*math.cos(math.radians(angle)))
        sy = cy_w + int(35*math.sin(math.radians(angle)))
        d.line([(cx_w,cy_w),(sx,sy)], fill=(80,60,30), width=3)
    # Handles
    for angle in range(0, 360, 45):
        hx = cx_w + int(40*math.cos(math.radians(angle)))
        hy = cy_w + int(40*math.sin(math.radians(angle)))
        d.ellipse([hx-4,hy-4,hx+4,hy+4], fill=(90,70,35))
    
    # Nautical map on wall
    d.rectangle([int(W*0.62), 30, int(W*0.82), 120], fill=(180,170,140), outline=(80,65,40), width=2)
    # Map lines
    for _ in range(10):
        d.line([(int(W*0.64)+random.randint(0,120), 35+random.randint(0,80)),
                (int(W*0.64)+random.randint(0,120), 35+random.randint(0,80))], fill=(100,80,50), width=1)
    
    # Window with sea view
    window_glow(d, int(W*0.78), 55, 85, 95, (18,30,55))
    
    # Wooden chair
    d.rectangle([int(W*0.15), fy-25, int(W*0.25), fy+10], fill=(48,32,18))
    d.rectangle([int(W*0.16), fy-55, int(W*0.18), fy-20], fill=(45,30,16))
    d.rectangle([int(W*0.22), fy-55, int(W*0.24), fy-20], fill=(45,30,16))
    # Back slats
    for i in range(3):
        bx = int(W*0.17)+i*12
        d.rectangle([bx, fy-55, bx+3, fy-25], fill=(42,28,14))
    
    save(label(img, "Maison du Gardien", "Vie au bout du monde"), 'keeper_house')

def gen_boathouse():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (18,20,26), (10,12,16))
    
    fy = int(H*0.58)
    # Water floor
    d.rectangle([0,fy,W,H], fill=(10,20,38))
    for i in range(20):
        wy = fy + i*6
        d.line([(0,wy),(W,wy+random.randint(-2,2))], fill=(14,25,42), width=1)
    # Water reflection/shimmer
    for _ in range(40):
        rx = random.randint(0,W)
        ry = random.randint(fy+10, H-10)
        d.line([(rx,ry),(rx+random.randint(5,20),ry)], fill=(20,35,55), width=1)
    
    # Wooden walls (planks)
    for x in range(0, W, 18):
        c = 28+random.randint(-5,5)
        d.rectangle([x,0,x+16,fy], fill=(c+10,c,c-5))
        d.line([(x,0),(x,fy)], fill=(c+3,c-3,c-8), width=1)
    
    # Roof beams
    for bx in range(0, W, int(W*0.25)):
        d.rectangle([bx, 0, bx+10, 15], fill=(40,30,18))
    d.line([(0,15),(W,15)], fill=(42,32,20), width=3)
    
    # Boat (large, center)
    d.polygon([(int(W*0.18),fy+15),(int(W*0.12),fy+65),(int(W*0.68),fy+65),(int(W*0.62),fy+15)], fill=(50,35,20))
    d.line([(int(W*0.18),fy+15),(int(W*0.62),fy+15)], fill=(55,40,25), width=3)  # Gunwale
    # Mast
    d.line([(int(W*0.40),fy-30),(int(W*0.40),fy+15)], fill=(58,42,25), width=4)
    
    # Tools on wall
    tools_x = [0.12, 0.22, 0.32, 0.42]
    for tx in tools_x:
        x = int(W*tx)
        d.line([(x,25),(x,25+random.randint(40,90))], fill=(75,70,65), width=3)
    # Oars crossed
    d.line([(int(W*0.02),20),(int(W*0.12),fy-20)], fill=(60,45,25), width=4)
    d.line([(int(W*0.12),20),(int(W*0.02),fy-20)], fill=(60,45,25), width=4)
    
    # Rope coils on wall
    cx_r, cy_r = int(W*0.78), 70
    for i in range(5):
        d.ellipse([cx_r-22+i*3, cy_r-22+i*3, cx_r+22-i*3, cy_r+22-i*3], outline=(130,110,60), width=3)
    
    # Oil barrel
    d.rectangle([int(W*0.82), fy-65, int(W*0.92), fy], fill=(48,55,48), outline=(40,48,40), width=2)
    d.ellipse([int(W*0.82), fy-70, int(W*0.92), fy-60], fill=(50,58,50), outline=(42,50,42), width=2)
    
    # Fishing nets
    for ny in range(20, 130, 12):
        for nx in range(int(W*0.60), int(W*0.78), 12):
            d.line([(nx,ny),(nx+12,ny+12)], fill=(80,70,48), width=1)
            d.line([(nx+12,ny),(nx,ny+12)], fill=(80,70,48), width=1)
    
    # Lantern
    d.rectangle([int(W*0.54), 30, int(W*0.56), 50], fill=(60,50,30))
    d.ellipse([int(W*0.53), 18, int(W*0.57), 32], fill=(240,210,80))
    for i in range(3):
        r = 8+i*8
        d.ellipse([int(W*0.55)-r, 25-r//2, int(W*0.55)+r, 30+r//3], fill=(240,210,80, max(15-i*4, 2)))
    
    save(label(img, "Remise à Bateaux", "Secrets submergés"), 'boathouse')


# ═══════════════════════════════════════════════════════
# CASE 4: Le Secret du Musée
# ═══════════════════════════════════════════════════════

def gen_museum_entrance():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (32,30,38), (16,14,22))
    
    fy = int(H*0.65)
    # Polished marble
    tile = 55
    for ty in range(fy, H, tile):
        for tx in range(0, W, tile):
            c = (45,42,48) if (tx//tile+ty//tile)%2==0 else (50,48,54)
            d.rectangle([tx,ty,tx+tile,ty+tile], fill=c)
    
    # Grand pillars (Corinthian style)
    for px in [0.06, 0.22, 0.78, 0.94]:
        x = int(W*px)
        d.rectangle([x-20, 12, x+20, fy], fill=(50,48,55))
        d.rectangle([x-26, 12, x+26, 28], fill=(56,54,60))
        d.rectangle([x-26, fy-10, x+26, fy], fill=(56,54,60))
    
    # Museum sign / pediment
    d.polygon([(int(W*0.15),12),(W//2,0),(int(W*0.85),12)], fill=(42,40,48))
    try:
        font = ImageFont.truetype('arial.ttf', 16)
        d.text((int(W*0.38), 25), "MUSÉE D'ART NATIONAL", fill=(200,180,80), font=font)
    except:
        pass
    
    # Archway
    d.arc([int(W*0.32),40,int(W*0.68),140], 180, 360, fill=(55,52,58), width=8)
    
    # Central sculpture
    d.rectangle([int(W*0.44), fy-35, int(W*0.56), fy], fill=(58,56,62))  # Pedestal
    d.rectangle([int(W*0.45), fy-40, int(W*0.55), fy-35], fill=(62,60,66))
    # Figure
    d.ellipse([int(W*0.47), fy-90, int(W*0.53), fy-40], fill=(170,165,158))
    d.ellipse([int(W*0.475), fy-110, int(W*0.525), fy-85], fill=(175,170,162))
    
    # Velvet ropes
    for rx in [0.35, 0.65]:
        d.rectangle([int(W*rx)-3, fy-42, int(W*rx)+3, fy], fill=(160,140,60))
    d.line([(int(W*0.35),fy-38),(int(W*0.65),fy-38)], fill=(140,25,25), width=4)
    
    chandelier(d, W//2, 15, 160)
    
    # Spotlights on floor
    for sx in [0.30, 0.50, 0.70]:
        d.polygon([(int(W*sx),0),(int(W*sx)-35,50),(int(W*sx)+35,50)], fill=(255,250,230, 12))
    
    # Side paintings
    d.rectangle([int(W*0.08), 60, int(W*0.18), 150], fill=(50,42,35), outline=(90,72,38), width=3)
    d.rectangle([int(W*0.82), 65, int(W*0.92), 155], fill=(48,40,33), outline=(90,72,38), width=3)
    
    save(label(img, "Hall du Musée", "Le Secret du Musée"), 'museum_entrance')

def gen_museum_gallery():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (35,33,40), (20,18,24))
    
    fy = int(H*0.65)
    d.rectangle([0,fy,W,H], fill=(40,38,42))
    
    # Gallery walls (clean, white-ish)
    d.rectangle([0,0,W,fy], fill=(35,33,40))
    
    # Paintings with frames and spotlights
    paintings = [
        (0.04, 45, 130, 165, (85,60,42)),    # Portrait warm
        (0.22, 55, 120, 145, (38,58,88)),    # Landscape blue
        (0.72, 50, 125, 155, (68,42,42)),    # Still life red
        (0.90, 40, 110, 160, (48,72,52)),    # Nature green
    ]
    for px, py, pw, ph, pc in paintings:
        x = int(W*px)
        d.rectangle([x-6,py-6,x+pw+6,py+ph+6], fill=(110,85,40), outline=(95,72,32), width=3)
        d.rectangle([x,py,x+pw,py+ph], fill=pc)
        # Abstract art
        for _ in range(8):
            ax = x+random.randint(8,pw-8)
            ay = py+random.randint(8,ph-8)
            ar = random.randint(6,25)
            ac = tuple(max(0,min(255,c+random.randint(-40,40))) for c in pc)
            d.ellipse([ax-ar,ay-ar,ax+ar,ay+ar], fill=ac)
        # Spotlight from ceiling
        d.polygon([(x+pw//2-5,0),(x+pw//2+5,0),(x+pw+22,py-5),(x-22,py-5)], fill=(255,250,220, 8))
    
    # STOLEN PAINTING — empty frame with police tape
    ex = int(W*0.45)
    d.rectangle([ex-6,42,ex+166,182], fill=(110,85,40), outline=(95,72,32), width=3)
    d.rectangle([ex,48,ex+160,176], fill=(25,22,30))
    # Police tape X
    d.line([(ex,48),(ex+160,176)], fill=(255,200,0), width=5)
    d.line([(ex+160,48),(ex,176)], fill=(255,200,0), width=5)
    try:
        font = ImageFont.truetype('arial.ttf', 10)
        d.text((ex+25, 100), "SCÈNE DE CRIME", fill=(255,200,0), font=font)
    except:
        pass
    
    # Viewing bench
    d.rounded_rectangle([int(W*0.35), fy-28, int(W*0.65), fy-5], radius=4, fill=(48,32,18))
    d.rectangle([int(W*0.37), fy-5, int(W*0.39), fy+15], fill=(42,28,14))
    d.rectangle([int(W*0.61), fy-5, int(W*0.63), fy+15], fill=(42,28,14))
    
    # Track lighting on ceiling
    d.rectangle([0,0,W,6], fill=(45,43,48))
    for lx in range(int(W*0.1), int(W*0.9), int(W*0.15)):
        d.rectangle([lx-5,0,lx+5,12], fill=(50,48,53))
    
    save(label(img, "Salle d'Exposition", "Tableau disparu"), 'museum_gallery')

def gen_museum_security():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (18,20,28), (10,12,16))
    
    fy = int(H*0.65)
    d.rectangle([0,fy,W,H], fill=(22,22,26))
    
    # Monitor wall (8 screens in 2 rows)
    for row in range(2):
        for col in range(4):
            mx = int(W*0.08)+col*int(W*0.22)
            my = 25+row*130
            # Monitor frame
            d.rectangle([mx,my,mx+int(W*0.19),my+115], fill=(28,28,32), outline=(45,45,50), width=2)
            # Screen
            sc = [(18,32,18),(22,28,22),(28,22,28),(18,22,32)]
            d.rectangle([mx+5,my+5,mx+int(W*0.19)-5,my+110], fill=sc[(row*4+col)%4])
            # Scan lines
            for sl in range(my+8, my+108, 6):
                d.line([(mx+8,sl),(mx+int(W*0.19)-8,sl)], fill=(35,45,35), width=1)
            # Camera label
            try:
                font = ImageFont.truetype('arial.ttf', 9)
                d.text((mx+8, my+8), f"CAM {row*4+col+1}", fill=(100,200,100), font=font)
            except:
                pass
            # Timestamp
            try:
                d.text((mx+int(W*0.12), my+95), "23:47", fill=(150,150,150), font=font)
            except:
                pass
            # REC dot
            d.ellipse([mx+int(W*0.16), my+8, mx+int(W*0.17), my+16], fill=(255,0,0))
    
    # Control desk
    d.rectangle([int(W*0.12), fy-45, int(W*0.88), fy], fill=(38,38,42))
    d.rectangle([int(W*0.12), fy-50, int(W*0.88), fy-45], fill=(48,48,52))
    
    # Keyboard
    d.rectangle([int(W*0.48), fy-42, int(W*0.65), fy-28], fill=(22,22,26), outline=(32,32,36))
    # Mouse
    d.ellipse([int(W*0.68), fy-38, int(W*0.72), fy-25], fill=(25,25,30))
    # Coffee mug
    d.rounded_rectangle([int(W*0.74), fy-42, int(W*0.78), fy-22], radius=3, fill=(70,48,28), outline=(60,40,22), width=2)
    d.arc([int(W*0.78), fy-40, int(W*0.80), fy-26], -90, 90, fill=(65,44,25), width=2)
    
    # Notepad
    d.rectangle([int(W*0.30), fy-40, int(W*0.42), fy-15], fill=(200,195,175))
    d.rectangle([int(W*0.30), fy-40, int(W*0.42), fy-38], fill=(180,30,30))
    
    # Walkie-talkie
    d.rectangle([int(W*0.18), fy-40, int(W*0.22), fy-15], fill=(20,20,22))
    d.rectangle([int(W*0.185), fy-50, int(W*0.215), fy-40], fill=(25,25,28))
    
    # Office chair
    d.ellipse([int(W*0.40), fy+8, int(W*0.60), fy+42], fill=(28,28,32))
    d.rounded_rectangle([int(W*0.42), fy-15, int(W*0.58), fy+18], radius=6, fill=(32,32,38))
    
    save(label(img, "Salle de Sécurité", "Surveillance 24h/24"), 'museum_security')

def gen_museum_office():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (30,28,38), (18,16,22))
    
    fy = int(H*0.65)
    wood_floor(d, W, H, fy, (28,24,32))
    
    # Elegant wallpaper
    for y in range(0, fy, 28):
        for x in range(0, W, 38):
            d.rectangle([x+13,y+8,x+25,y+20], fill=(34,32,42))
    
    # Crown molding
    d.rectangle([0,0,W,6], fill=(40,38,45))
    
    # Large desk
    d.rectangle([int(W*0.18), fy-55, int(W*0.72), fy-18], fill=(58,36,20))
    d.rectangle([int(W*0.18), fy-60, int(W*0.72), fy-55], fill=(68,42,25))
    
    # Papers & documents
    for _ in range(6):
        px = int(W*0.22)+random.randint(0, int(W*0.42))
        py = fy-52+random.randint(0,18)
        d.rectangle([px,py,px+22,py+30], fill=(205+random.randint(-10,0), 195+random.randint(-10,0), 175+random.randint(-10,0)))
    
    # Magnifying glass on desk
    mgx, mgy = int(W*0.55), fy-48
    d.ellipse([mgx-14,mgy-14,mgx+14,mgy+14], outline=(160,150,130), width=3)
    d.line([(mgx+10,mgy+10),(mgx+24,mgy+24)], fill=(130,120,100), width=3)
    
    # Small painting on wall
    d.rectangle([int(W*0.38), 35, int(W*0.62), 150], fill=(65,48,32), outline=(100,78,38), width=4)
    d.rectangle([int(W*0.40), 42, int(W*0.60), 143], fill=(55,42,28))
    
    # Bookshelf
    bookshelf(d, int(W*0.76), 25, int(W*0.22), fy-30)
    
    # Elegant leather chair
    d.rounded_rectangle([int(W*0.38), fy-32, int(W*0.55), fy+22], radius=6, fill=(85,30,25))
    d.rounded_rectangle([int(W*0.39), fy-52, int(W*0.54), fy-18], radius=8, fill=(90,35,28))
    # Chair buttons
    for cb in [(0.44, fy-42), (0.48, fy-42), (0.44, fy-30), (0.48, fy-30)]:
        d.ellipse([int(W*cb[0])-2, cb[1]-2, int(W*cb[0])+2, cb[1]+2], fill=(75,25,20))
    
    # Safe (partially hidden)
    d.rectangle([int(W*0.02), fy-85, int(W*0.15), fy], fill=(52,52,58), outline=(62,62,68), width=2)
    d.ellipse([int(W*0.06), fy-58, int(W*0.11), fy-32], outline=(160,140,60), width=4)
    d.ellipse([int(W*0.08), fy-48, int(W*0.09), fy-42], fill=(170,150,70))
    
    # Desk lamp
    d.rectangle([int(W*0.25), fy-72, int(W*0.27), fy-55], fill=(60,50,35))
    d.polygon([(int(W*0.22), fy-72),(int(W*0.30), fy-72),(int(W*0.26), fy-95)], fill=(30,60,30))
    for i in range(4):
        r = 20+i*12
        d.ellipse([int(W*0.26)-r, fy-80-r//3, int(W*0.26)+r, fy-60+r//2], fill=(200,190,100, max(15-i*3, 2)))
    
    save(label(img, "Bureau de Conservation", "Documents classifiés"), 'museum_office')

def gen_museum_workshop():
    img = Image.new('RGBA', (W, H))
    d = ImageDraw.Draw(img)
    gradient(d, W, H, (25,25,28), (15,15,18))
    
    fy = int(H*0.65)
    d.rectangle([0,fy,W,H], fill=(30,28,25))
    
    # Work table large
    d.rectangle([int(W*0.08), fy-55, int(W*0.58), fy-5], fill=(52,42,28))
    d.rectangle([int(W*0.08), fy-60, int(W*0.58), fy-55], fill=(62,50,33))
    d.rectangle([int(W*0.10), fy-5, int(W*0.12), fy+15], fill=(48,38,25))
    d.rectangle([int(W*0.54), fy-5, int(W*0.56), fy+15], fill=(48,38,25))
    
    # Canvas on easel
    ex = int(W*0.68)
    d.line([(ex,fy),(ex-8,45)], fill=(48,38,22), width=4)
    d.line([(ex+40,fy),(ex+48,45)], fill=(48,38,22), width=4)
    d.line([(ex-8,45),(ex+48,45)], fill=(48,38,22), width=3)
    d.line([(ex-5,120),(ex+45,120)], fill=(45,35,20), width=3)  # Shelf
    d.rectangle([ex-5,50,ex+55,190], fill=(185,180,165), outline=(120,100,50), width=2)
    # Half-restored painting on canvas
    d.rectangle([ex,55,ex+50,185], fill=(60,50,40))
    d.rectangle([ex,55,ex+25,185], fill=(70,55,42))  # Restored half (lighter)
    
    # Paint supplies on table
    colors_p = [(200,30,30),(30,80,200),(250,200,30),(30,150,50),(200,200,200),(200,100,30)]
    for i, c in enumerate(colors_p):
        d.rectangle([int(W*0.12)+i*24, fy-52, int(W*0.12)+i*24+16, fy-28], fill=c)
    
    # Brushes in jar
    d.rounded_rectangle([int(W*0.46), fy-78, int(W*0.50), fy-50], radius=3, fill=(80,68,48), outline=(70,58,38), width=2)
    for i in range(6):
        bx = int(W*0.465)+i*4
        d.line([(bx, fy-95-random.randint(0,18)),(bx, fy-78)], fill=(90+random.randint(0,30),75,48), width=2)
        d.ellipse([bx-2, fy-98-random.randint(0,18), bx+2, fy-92-random.randint(0,15)],
                  fill=random.choice(colors_p))
    
    # Magnifying glass
    mgx, mgy = int(W*0.35), fy-48
    d.ellipse([mgx-15,mgy-15,mgx+15,mgy+15], fill=(200,200,210, 40), outline=(160,150,130), width=3)
    d.line([(mgx+10,mgy+10),(mgx+25,mgy+25)], fill=(130,120,100), width=3)
    
    # Chemical bottles on shelf
    shelf_y = 210
    d.rectangle([int(W*0.68), shelf_y, int(W*0.96), shelf_y+5], fill=(48,42,35))
    for i in range(6):
        bx = int(W*0.70)+i*25
        bh = random.randint(28,50)
        bc = (random.randint(40,100),random.randint(55,130),random.randint(75,150))
        d.rectangle([bx, shelf_y-bh, bx+18, shelf_y], fill=bc)
        d.rectangle([bx, shelf_y-bh-4, bx+18, shelf_y-bh], fill=(bc[0]+20,bc[1]+20,bc[2]+20))
    
    # UV light on table
    d.rectangle([int(W*0.40), fy-65, int(W*0.43), fy-48], fill=(75,48,115))
    d.ellipse([int(W*0.395), fy-70, int(W*0.435), fy-62], fill=(130,80,210))
    # UV glow
    for i in range(3):
        r = 8+i*8
        d.ellipse([int(W*0.415)-r, fy-66-r//2, int(W*0.415)+r, fy-60+r//3], fill=(120,70,200, max(15-i*4, 2)))
    
    # Microscope
    d.rectangle([int(W*0.18), fy-80, int(W*0.22), fy-50], fill=(40,40,45))
    d.rectangle([int(W*0.17), fy-50, int(W*0.23), fy-45], fill=(45,45,50))
    d.rectangle([int(W*0.19), fy-100, int(W*0.21), fy-80], fill=(38,38,42))
    d.ellipse([int(W*0.185), fy-108, int(W*0.215), fy-96], fill=(50,50,55))
    
    # Apron hanging
    d.polygon([(int(W*0.02), 60),(int(W*0.12), 60),(int(W*0.10), 180),(int(W*0.04), 180)], fill=(200,195,180))
    d.rectangle([int(W*0.04), 55, int(W*0.10), 60], fill=(180,175,160))
    
    save(label(img, "Atelier de Restauration", "Art, science et secrets"), 'museum_workshop')


# ═══════════════════════════════════════════════════════
print("🎨 Génération des scènes v2 (1024×640)...\n")

generators = [
    # Case 1
    gen_mansion_entrance, gen_living_room, gen_study, gen_kitchen, gen_garden, gen_bedroom, gen_office,
    # Case 2
    gen_theatre_entrance, gen_theatre_stage, gen_backstage, gen_theatre_office,
    # Case 3
    gen_island_dock, gen_lighthouse, gen_lighthouse_top, gen_keeper_house, gen_boathouse,
    # Case 4
    gen_museum_entrance, gen_museum_gallery, gen_museum_security, gen_museum_office, gen_museum_workshop,
]

for gen in generators:
    name = gen.__name__.replace('gen_', '')
    print(f"  [{name}]")
    gen()

total = sum(os.path.getsize(os.path.join(OUTPUT, f)) for f in os.listdir(OUTPUT) if f.endswith('.jpg'))
print(f"\n✅ {len(generators)} images générées — Total: {total/1024:.0f} KB")
