/**
 * CaseData3.js — "Meurtre au Phare"
 * Un gardien de phare est retrouvé mort sur une île isolée. Accident ou meurtre ?
 */
window.CASE_DATA_3 = {
    id: 'case_3',
    title: 'Meurtre au Phare',
    subtitle: 'Mort sur l\'île de Kervagen',
    difficulty: '⭐⭐⭐',
    intro: `Henri Callec, gardien du phare de l'île de Kervagen en Bretagne, est retrouvé mort au pied de l'escalier en colimaçon.
La police locale parle d'accident, mais des détails troublants vous ont fait dépêcher sur place.
Trois personnes se trouvaient sur l'île cette nuit de tempête.`,

    suspects: [
        {
            id: 'nathalie',
            name: 'Nathalie Callec',
            role: 'Fille du gardien',
            emoji: '👩‍🦰',
            description: 'Fille d\'Henri, 32 ans. Revenue sur l\'île après 10 ans d\'absence. Relations très tendues avec son père qui l\'avait reniée.',
            alibi: 'Dormait dans la maison du gardien au moment de la chute.'
        },
        {
            id: 'yves',
            name: 'Yves Le Goff',
            role: 'Pêcheur local',
            emoji: '🧔‍♂️',
            description: 'Pêcheur venu se réfugier sur l\'île à cause de la tempête. Ancien ami d\'Henri, brouillés depuis un conflit territorial en mer.',
            alibi: 'Prétend s\'être endormi dans la remise à bateaux.'
        },
        {
            id: 'camille',
            name: 'Camille Renard',
            role: 'Photographe / journaliste',
            emoji: '📷',
            description: 'Photographe venue documenter le phare pour un magazine. S\'intéresse de très près à l\'histoire de l\'île et à un trésor caché.',
            alibi: 'Affirme avoir photographié la tempête depuis la terrasse de la maison.'
        }
    ],

    clues: [
        {
            id: 'marches_huilee',
            name: 'Marches huilées',
            description: 'Deux marches près du sommet de l\'escalier sont anormalement glissantes. Une substance huileuse a été appliquée récemment.',
            shortDesc: 'Huile sur les marches de l\'escalier',
            location: 'lighthouse',
            category: 'physical'
        },
        {
            id: 'lampe_eteinte',
            name: 'Lampe du phare éteinte',
            description: 'La lampe du phare a été volontairement éteinte. Le mécanisme de rotation a été saboté avec un tournevis.',
            shortDesc: 'Lampe sabotée au tournevis',
            location: 'lighthouse_top',
            category: 'physical'
        },
        {
            id: 'tournevis',
            name: 'Tournevis ensanglanté',
            description: 'Un tournevis trouvé au pied de l\'escalier, près du corps. Des traces de sang d\'Henri et des empreintes partielles dessus.',
            shortDesc: 'Tournevis avec sang et empreintes',
            location: 'lighthouse',
            category: 'forensic'
        },
        {
            id: 'journal_henri',
            name: 'Journal intime d\'Henri',
            description: 'Le dernier journal d\'Henri. Il mentionne : "Elle est revenue pour la carte. Je ne la laisserai pas prendre ce qui appartient à l\'île."',
            shortDesc: 'Journal : "Elle est revenue pour la carte"',
            location: 'keeper_house',
            category: 'document'
        },
        {
            id: 'carte_tresor',
            name: 'Carte ancienne',
            description: 'Une vieille carte marine cachée dans un coffre sous le plancher. Elle indique l\'emplacement d\'une épave contenant un trésor de la Révolution.',
            shortDesc: 'Carte d\'un trésor caché',
            location: 'keeper_house',
            category: 'document'
        },
        {
            id: 'huile_moteur',
            name: 'Bidon d\'huile entamé',
            description: 'Un bidon d\'huile moteur dans la remise, récemment ouvert. L\'huile correspond à celle trouvée sur les marches du phare.',
            shortDesc: 'Huile identique à celle des marches',
            location: 'boathouse',
            category: 'physical'
        },
        {
            id: 'empreintes_bottes',
            name: 'Empreintes de bottes',
            description: 'Des empreintes de bottes dans la boue entre la remise et le phare. Pointure 38 — les bottes de Nathalie.',
            shortDesc: 'Empreintes pointure 38 (Nathalie)',
            location: 'lighthouse',
            category: 'forensic'
        },
        {
            id: 'lettre_avocat',
            name: 'Lettre d\'un avocat',
            description: 'Lettre adressée à Nathalie d\'un cabinet d\'avocats : "Nous confirmons que l\'île et le phare vous reviennent en cas de décès de votre père."',
            shortDesc: 'Héritage de l\'île pour Nathalie',
            location: 'keeper_house',
            category: 'document'
        },
        {
            id: 'photos_camille',
            name: 'Photos de Camille',
            description: 'La carte SD de l\'appareil de Camille contient des photos de la carte au trésor prises en cachette, datées de la veille.',
            shortDesc: 'Photos secrètes de la carte au trésor',
            location: 'keeper_house',
            category: 'document'
        },
        {
            id: 'temoignage_yves',
            name: 'Témoignage d\'Yves',
            description: 'Yves affirme avoir entendu une violente dispute entre Nathalie et Henri vers minuit. "Je l\'ai entendue crier : Tu n\'as jamais rien fait pour moi !"',
            shortDesc: 'Yves a entendu une dispute à minuit',
            location: 'boathouse',
            category: 'testimony'
        }
    ],

    locations: [
        {
            id: 'island_dock',
            name: 'Quai de l\'île',
            icon: '⚓',
            scene: 'island_dock',
            description: 'Le petit quai battu par les vagues. Le seul accès à l\'île.',
            unlocked: true,
            hotspots: [
                {
                    id: 'hs_path',
                    label: 'Sentier vers le phare',
                    x: 40, y: 35, width: 20, height: 20,
                    type: 'object',
                    examineText: 'Un sentier rocailleux mène vers le phare qui domine l\'île. La tempête a laissé des débris partout.',
                    unlockLocation: 'lighthouse',
                    flag: 'arrived_island'
                },
                {
                    id: 'hs_boat',
                    label: 'Bateau d\'Yves',
                    x: 10, y: 55, width: 20, height: 15,
                    type: 'object',
                    examineText: 'Le bateau de pêche d\'Yves Le Goff. Il est solidement amarré. Il ne pouvait pas partir pendant la tempête — personne ne le pouvait.'
                }
            ]
        },
        {
            id: 'lighthouse',
            name: 'Phare (Base)',
            icon: '🗼',
            scene: 'lighthouse',
            description: 'La base du phare. L\'escalier en colimaçon monte vers la lanterne.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_stairs_bottom',
                    label: 'Pied de l\'escalier',
                    x: 30, y: 40, width: 40, height: 25,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'C\'est ici qu\'Henri a été retrouvé. Au pied de l\'escalier en colimaçon. 28 mètres de chute.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un tournevis au sol, près du corps. Il y a du sang dessus et des empreintes partielles...',
                                action: { addClue: 'tournevis' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_stairs_mid',
                    label: 'Marches suspectes',
                    x: 60, y: 20, width: 20, height: 20,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'En montant l\'escalier... attention ! Ces marches sont incroyablement glissantes !'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Une substance huileuse. Appliquée récemment — elle n\'a pas encore séché. Ce n\'est pas un accident.',
                                action: { addClue: 'marches_huilee' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_boot_prints',
                    label: 'Traces au sol',
                    x: 10, y: 60, width: 25, height: 12,
                    type: 'object',
                    condition: { hasClue: 'marches_huilee' },
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Des empreintes de bottes dans la boue à l\'entrée du phare. Pointure 38. Assez petit.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Nathalie porte du 38. Yves et Camille ont des pieds plus grands. Ces traces mènent de la remise au phare.',
                                action: { addClue: 'empreintes_bottes' }
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'lighthouse_top',
            name: 'Sommet du Phare',
            icon: '💡',
            scene: 'lighthouse_top',
            description: 'La salle de la lanterne au sommet du phare.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_lamp',
                    label: 'Lanterne du phare',
                    x: 25, y: 15, width: 50, height: 40,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'La grande lanterne. Elle est éteinte depuis la nuit du drame. Le mécanisme de rotation est bloqué.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Des marques de tournevis sur le mécanisme. Quelqu\'un a volontairement saboté la lanterne. Henri est monté pour la réparer... et il a glissé sur les marches huilées.',
                                action: { addClue: 'lampe_eteinte' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Le piège est clair : saboter la lampe pour forcer Henri à monter, puis huiler les marches. Préméditation totale.)',
                                action: { journal: 'Piège prémédité : lampe sabotée + marches huilées = chute mortelle.' }
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'keeper_house',
            name: 'Maison du Gardien',
            icon: '🏠',
            scene: 'keeper_house',
            description: 'La petite maison où vivait Henri Callec.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_desk_keeper',
                    label: 'Bureau d\'Henri',
                    x: 15, y: 35, width: 30, height: 20,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le bureau d\'Henri. Des cartes marines, des livres sur les naufrages... et un journal intime.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'La dernière entrée : "Elle est revenue pour la carte. Je ne la laisserai pas prendre ce qui appartient à l\'île."',
                                action: { addClue: 'journal_henri' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Qui est "elle" ? Et quelle carte ? Je dois fouiller davantage.)',
                                action: { journal: 'Henri mentionnait quelqu\'un qui voulait "la carte". À qui faisait-il référence ?' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_floor',
                    label: 'Plancher suspect',
                    x: 55, y: 60, width: 20, height: 12,
                    type: 'object',
                    condition: { hasClue: 'journal_henri' },
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le journal mentionne "la carte"... une latte du plancher semble plus usée que les autres.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Sous la latte, un coffret métallique ! Et dedans... une vieille carte marine datant de la Révolution. Elle indique l\'emplacement d\'une épave.',
                                action: { addClue: 'carte_tresor' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Un trésor caché... voilà le vrai mobile du meurtre.)',
                                action: { journal: 'Carte au trésor trouvée sous le plancher. L\'épave contiendrait un trésor révolutionnaire.' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_letter',
                    label: 'Courrier',
                    x: 80, y: 30, width: 12, height: 15,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Du courrier sur la table. Une lettre d\'un cabinet d\'avocats adressée à Nathalie Callec...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '"Nous confirmons que l\'île et le phare vous reviennent en cas de décès de votre père." Nathalie hérite de tout.',
                                action: { addClue: 'lettre_avocat' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_camille_camera',
                    label: 'Appareil photo de Camille',
                    x: 5, y: 50, width: 12, height: 12,
                    type: 'object',
                    condition: { hasClue: 'carte_tresor' },
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'L\'appareil photo de Camille est posé ici. Vérifions la carte SD...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Des photos de la carte au trésor ! Prises en cachette la veille. Camille savait pour le trésor.',
                                action: { addClue: 'photos_camille' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_nathalie',
                    label: 'Nathalie Callec',
                    x: 40, y: 25, width: 12, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Nathalie Callec', portrait: '👩‍🦰',
                                text: '*pleure* Mon père... même après tout ce qu\'il m\'a fait, je ne voulais pas ça.',
                                action: { addSuspect: 'nathalie' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Pourquoi étiez-vous revenue sur l\'île après 10 ans ?'
                            },
                            {
                                speaker: 'Nathalie Callec', portrait: '👩‍🦰',
                                text: 'Pour me réconcilier avec lui. Il vieillissait. Je voulais faire la paix avant qu\'il soit trop tard.',
                                choices: [
                                    {
                                        text: '🔍 La dispute que vous avez eue à minuit...',
                                        condition: { hasClue: 'temoignage_yves' },
                                        goto: 3
                                    },
                                    {
                                        text: '👢 Vos bottes correspondent aux traces près du phare.',
                                        condition: { hasClue: 'empreintes_bottes' },
                                        goto: 5
                                    },
                                    {
                                        text: '📜 Vous héritez de l\'île et du phare...',
                                        condition: { hasClue: 'lettre_avocat' },
                                        goto: 7
                                    },
                                    {
                                        text: '✋ Courage, Nathalie.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Nathalie Callec', portrait: '👩‍🦰',
                                text: 'Oui, on s\'est disputés. Il m\'a accusée de n\'être revenue que pour l\'argent et la carte. Quelle carte, je ne sais même pas !',
                                action: { setFlag: 'nathalie_dispute', journal: 'Nathalie admet la dispute mais prétend ne rien savoir de la carte.' }
                            },
                            { speaker: 'Vous', portrait: '🕵️', text: '(Elle ment ou elle dit vrai ? Difficile à dire.)' },
                            {
                                speaker: 'Nathalie Callec', portrait: '👩‍🦰',
                                text: 'Mes bottes ? Je suis allée au phare en début de soirée pour apporter le dîner à mon père. C\'est normal !',
                                action: { setFlag: 'nathalie_boots_excuse', journal: 'Nathalie justifie ses empreintes par un dîner apporté au phare.' }
                            },
                            { speaker: 'Vous', portrait: '🕵️', text: '(Les empreintes vont de la remise au phare, pas de la maison... elle ment.)' },
                            {
                                speaker: 'Nathalie Callec', portrait: '👩‍🦰',
                                text: 'L\'héritage ? *pâlit* C\'est... mon père m\'avait reniée. Je ne savais pas que... je ne savais pas qu\'il avait changé d\'avis.',
                                action: { setFlag: 'nathalie_heritage', journal: 'Nathalie prétend ignorer qu\'elle héritait de l\'île.' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_camille_person',
                    label: 'Camille Renard',
                    x: 80, y: 40, width: 12, height: 25,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Camille Renard', portrait: '📷',
                                text: 'Inspecteur. Je suis juste une photographe venue documenter ce phare historique. Rien de plus.',
                                action: { addSuspect: 'camille' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Vos photos montrent la carte au trésor, prise en cachette la veille.',
                                condition: { hasClue: 'photos_camille' }
                            },
                            {
                                speaker: 'Camille Renard', portrait: '📷',
                                text: '...C\'est de la recherche journalistique ! L\'histoire de cette épave est fascinante. Je n\'ai tué personne !',
                                choices: [
                                    {
                                        text: '🔍 Henri savait que vous espionniez ?',
                                        goto: 3
                                    },
                                    {
                                        text: '✋ On verra.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Camille Renard', portrait: '📷',
                                text: 'Il m\'a surprise hier. Il était furieux. Mais tuer un homme pour une vieille carte ? Je suis journaliste, pas criminelle !',
                                action: { setFlag: 'camille_caught', journal: 'Camille admet qu\'Henri l\'a surprise en train de photographier la carte.' }
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'boathouse',
            name: 'Remise à bateaux',
            icon: '🚣',
            scene: 'boathouse',
            description: 'La remise où Yves s\'est réfugié pendant la tempête.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_oil',
                    label: 'Bidon d\'huile',
                    x: 15, y: 45, width: 15, height: 18,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un bidon d\'huile moteur. Il a été ouvert récemment, le bouchon est encore gras.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Cette huile... c\'est la même que celle trouvée sur les marches du phare. Quelqu\'un est venu ici chercher de quoi huiler l\'escalier.',
                                action: { addClue: 'huile_moteur' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_yves',
                    label: 'Yves Le Goff',
                    x: 55, y: 30, width: 15, height: 30,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Yves Le Goff', portrait: '🧔‍♂️',
                                text: '*bourru* Henri et moi, on était amis autrefois. Avant cette histoire de zones de pêche. Mais je ne lui voulais pas de mal.',
                                action: { addSuspect: 'yves' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Qu\'avez-vous entendu cette nuit ?'
                            },
                            {
                                speaker: 'Yves Le Goff', portrait: '🧔‍♂️',
                                text: 'La tempête faisait un vacarme terrible. Mais vers minuit, j\'ai entendu des cris venant de la maison. Nathalie et Henri se disputaient violemment.',
                                action: { addClue: 'temoignage_yves' }
                            },
                            {
                                speaker: 'Yves Le Goff', portrait: '🧔‍♂️',
                                text: 'Elle hurlait : "Tu n\'as jamais rien fait pour moi !" Après ça, le silence. Puis vers 2h du matin, j\'ai entendu un cri bref depuis le phare.',
                                choices: [
                                    {
                                        text: '🔍 L\'huile dans la remise, vous l\'avez utilisée ?',
                                        condition: { hasClue: 'huile_moteur' },
                                        goto: 4
                                    },
                                    {
                                        text: '✋ Merci Yves.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Yves Le Goff', portrait: '🧔‍♂️',
                                text: 'L\'huile ? C\'est pour mon bateau. Je ne suis pas monté au phare cette nuit. Pourquoi je l\'aurais fait ?',
                                action: { setFlag: 'yves_oil_denied', journal: 'Yves nie avoir utilisé l\'huile pour autre chose que son bateau.' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_tools',
                    label: 'Outils',
                    x: 80, y: 40, width: 12, height: 20,
                    type: 'object',
                    examineText: 'Des outils de pêche et de mécanique. Filets, cordages, clés à molette... tout semble à sa place.'
                }
            ]
        }
    ],

    solution: {
        culprit: 'nathalie',
        keyEvidence: ['marches_huilee', 'huile_moteur', 'empreintes_bottes', 'lampe_eteinte', 'lettre_avocat'],
        
        endings: {
            perfect: {
                title: '🏆 Justice Parfaite !',
                text: `Votre enquête magistrale expose Nathalie Callec. Les empreintes de ses bottes entre la remise et le phare, l'huile identique sur les marches et dans la remise, le sabotage de la lampe et la lettre de l'avocat forment un faisceau de preuves accablant.

Nathalie n'était pas revenue pour se réconcilier. Elle savait pour le trésor grâce à des lettres de sa mère décédée. Elle savait aussi qu'elle hériterait de l'île. 

Son plan : saboter la lampe pour forcer Henri à monter réparer, huiler les marches pour provoquer une chute "accidentelle". Elle a pris l'huile dans la remise après la dispute de minuit, puis a huilé les marches et saboté la lampe.

Henri est monté vers 2h du matin en découvrant la panne. Il a glissé et fait une chute fatale de 28 mètres.

Le trésor de l'île de Kervagen sera confié au musée maritime de Brest.`
            },
            good: {
                title: '✅ Enquête Résolue',
                text: `Vous avez identifié Nathalie comme coupable, mais il manque des preuves clés. Le dossier est fragile mais suffisant pour une mise en examen. Justice partielle est rendue.`
            },
            wrong: {
                title: '❌ Fausse Accusation',
                text: `Vous avez accusé la mauvaise personne. Nathalie Callec, la vraie coupable, hérite de l'île et de la carte au trésor. Le meurtre d'Henri sera classé comme accident. L'île de Kervagen gardera ses secrets.`
            }
        }
    },

    introDialogue: {
        nodes: [
            {
                speaker: 'Capitaine Leroux', portrait: '👮',
                text: 'Inspecteur Morel, bienvenue sur l\'île de Kervagen. La traversée a été rude avec cette tempête.'
            },
            {
                speaker: 'Capitaine Leroux', portrait: '👮',
                text: 'Henri Callec, gardien du phare depuis 35 ans, retrouvé mort au pied de l\'escalier. La police locale dit accident, mais j\'ai des doutes.'
            },
            {
                speaker: 'Vous', portrait: '🕵️',
                text: 'Qu\'est-ce qui vous fait douter ?'
            },
            {
                speaker: 'Capitaine Leroux', portrait: '👮',
                text: 'Henri connaissait ce phare comme sa poche. Glisser dans l\'escalier après 35 ans ? Et la lampe était éteinte — du jamais vu.'
            },
            {
                speaker: 'Capitaine Leroux', portrait: '👮',
                text: 'Trois personnes sur l\'île : sa fille Nathalie, le pêcheur Yves Le Goff, et une photographe, Camille Renard.',
                action: {
                    unlockLocation: 'lighthouse',
                    journal: 'Arrivée sur l\'île de Kervagen. Henri Callec mort au pied de l\'escalier du phare. Suspects : Nathalie (fille), Yves (pêcheur), Camille (photographe).'
                }
            },
            {
                speaker: 'Vous', portrait: '🕵️',
                text: 'Personne ne pouvait quitter l\'île cette nuit à cause de la tempête. Le coupable est encore ici. Allons-y.',
                action: (state) => {
                    state.unlockLocation('lighthouse_top');
                    state.unlockLocation('keeper_house');
                    state.unlockLocation('boathouse');
                    state.set('gamePhase', 'investigation');
                }
            }
        ]
    }
};
