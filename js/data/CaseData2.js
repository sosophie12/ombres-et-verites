/**
 * CaseData2.js — "Le Poison du Maestro"
 * Un célèbre chef d'orchestre meurt en plein concert. Qui l'a empoisonné ?
 */
window.CASE_DATA_2 = {
    id: 'case_2',
    title: 'Le Poison du Maestro',
    subtitle: 'Mort en plein concert',
    difficulty: '⭐⭐',
    intro: `Le célèbre chef d'orchestre Édouard Lefèvre s'effondre en plein concert au Grand Théâtre de Lyon.
L'autopsie révèle un empoisonnement au ricin, administré quelques heures avant le spectacle.
Vous êtes chargé d'enquêter parmi les membres de l'orchestre et son entourage.`,

    suspects: [
        {
            id: 'sylvie',
            name: 'Sylvie Moreau',
            role: 'Première violoniste',
            emoji: '🎻',
            description: 'Violoniste prodige, 34 ans. Lefèvre l\'a publiquement humiliée lors de la dernière répétition, menaçant de la remplacer.',
            alibi: 'Préparait son instrument dans sa loge une heure avant le concert.'
        },
        {
            id: 'antoine',
            name: 'Antoine Lefèvre',
            role: 'Fils du maestro',
            emoji: '👨‍🎤',
            description: 'Fils unique, 25 ans, musicien raté selon son père. Héritera de la fortune familiale et de la direction de la fondation Lefèvre.',
            alibi: 'Dit avoir été au bar du théâtre avec des amis.'
        },
        {
            id: 'helene',
            name: 'Hélène Vasseur',
            role: 'Ex-femme du maestro',
            emoji: '👱‍♀️',
            description: 'Divorce acrimonieux il y a 2 ans. Chanteuse lyrique autrefois célèbre. Lefèvre avait ruiné sa carrière en la blacklistant.',
            alibi: 'Assistait au concert depuis une loge privée.'
        },
        {
            id: 'marco',
            name: 'Marco Benedetti',
            role: 'Chef assistant',
            emoji: '🎼',
            description: 'Italien, 45 ans. Numéro deux de l\'orchestre depuis 10 ans. Lefèvre bloquait sa promotion comme directeur musical.',
            alibi: 'Était dans la fosse avec l\'orchestre, gérant les partitions.'
        }
    ],

    clues: [
        {
            id: 'bouteille_eau',
            name: 'Bouteille d\'eau trafiquée',
            description: 'La bouteille d\'eau personnelle du maestro, trouvée sur le pupitre. L\'analyse révèle des traces de ricin dans l\'eau.',
            shortDesc: 'Bouteille d\'eau empoisonnée',
            location: 'theatre_stage',
            category: 'physical'
        },
        {
            id: 'gants_latex',
            name: 'Gants en latex',
            description: 'Une paire de gants en latex jetés dans la poubelle de la loge de Sylvie. Des traces de ricin sont détectées dessus.',
            shortDesc: 'Gants latex avec traces de ricin',
            location: 'backstage',
            category: 'physical'
        },
        {
            id: 'email_menace',
            name: 'E-mail de menace',
            description: 'Un e-mail envoyé depuis un compte anonyme à Lefèvre : "Votre dernier concert approche, Maestro." Daté d\'il y a 3 jours.',
            shortDesc: 'E-mail menaçant anonyme',
            location: 'theatre_office',
            category: 'document'
        },
        {
            id: 'assurance_vie',
            name: 'Police d\'assurance vie',
            description: 'Assurance vie de 3 millions d\'euros au nom d\'Antoine Lefèvre, souscrite par le maestro il y a 6 mois.',
            shortDesc: 'Assurance vie de 3M€ pour Antoine',
            location: 'theatre_office',
            category: 'document'
        },
        {
            id: 'flacon_ricin',
            name: 'Flacon de ricine',
            description: 'Un petit flacon contenant de la ricine, trouvé caché dans un étui à violon dans le débarras. L\'étui porte les initiales "S.M.".',
            shortDesc: 'Ricine dans un étui à violon S.M.',
            location: 'backstage',
            category: 'physical'
        },
        {
            id: 'temoignage_regisseur',
            name: 'Témoignage du régisseur',
            description: 'Le régisseur affirme avoir vu quelqu\'un entrer dans la loge du maestro 30 minutes avant le concert. La silhouette portait une robe noire.',
            shortDesc: 'Silhouette en robe noire dans la loge',
            location: 'backstage',
            category: 'testimony'
        },
        {
            id: 'partition_annotee',
            name: 'Partition annotée',
            description: 'Une partition trouvée dans la poubelle du bureau avec la note manuscrite de Marco : "Après ce soir, tout changera."',
            shortDesc: 'Note de Marco sur une partition',
            location: 'theatre_office',
            category: 'document'
        },
        {
            id: 'camera_couloir',
            name: 'Vidéo de surveillance',
            description: 'La caméra du couloir montre Sylvie entrant dans la loge du maestro à 19h30 avec un sac. Elle en ressort 5 minutes plus tard sans le sac.',
            shortDesc: 'Sylvie filmée dans la loge du maestro',
            location: 'theatre_office',
            category: 'forensic'
        },
        {
            id: 'divorce_documents',
            name: 'Acte de divorce',
            description: 'L\'acte de divorce entre Hélène et Édouard. Une clause stipule qu\'Hélène recevrait 500 000€ supplémentaires "en cas de décès du maestro".',
            shortDesc: 'Clause financière suspecte du divorce',
            location: 'theatre_office',
            category: 'document'
        },
        {
            id: 'sms_sylvie',
            name: 'SMS de Sylvie',
            description: 'Téléphone de Sylvie : un SMS envoyé à un contact "Labo" deux jours avant : "C\'est prêt ? J\'en ai besoin avant vendredi."',
            shortDesc: 'SMS suspect de Sylvie à un labo',
            location: 'backstage',
            category: 'document'
        }
    ],

    locations: [
        {
            id: 'theatre_entrance',
            name: 'Hall du Théâtre',
            icon: '🎭',
            scene: 'theatre_entrance',
            description: 'L\'entrée majestueuse du Grand Théâtre de Lyon.',
            unlocked: true,
            hotspots: [
                {
                    id: 'hs_doors',
                    label: 'Entrer dans le théâtre',
                    x: 38, y: 30, width: 24, height: 30,
                    type: 'object',
                    examineText: 'Les grandes portes dorées du théâtre. Le personnel de sécurité vous laisse passer avec votre badge.',
                    unlockLocation: 'theatre_stage',
                    flag: 'entered_theatre'
                },
                {
                    id: 'hs_poster',
                    label: 'Affiche du concert',
                    x: 10, y: 20, width: 15, height: 30,
                    type: 'object',
                    examineText: '"Grand Concert Exceptionnel — Direction : Maestro Édouard Lefèvre — Œuvres de Beethoven et Ravel". Ce devait être une soirée triomphale.'
                }
            ]
        },
        {
            id: 'theatre_stage',
            name: 'Scène du Théâtre',
            icon: '🎶',
            scene: 'theatre_stage',
            description: 'La grande scène où le maestro s\'est effondré.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_podium',
                    label: 'Pupitre du chef',
                    x: 35, y: 35, width: 30, height: 25,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le pupitre du maestro. Sa baguette est encore posée là. Et sa bouteille d\'eau personnelle...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'La bouteille est presque vide. Je vais la faire analyser immédiatement. Si le poison était là-dedans...',
                                action: { addClue: 'bouteille_eau' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_marco_stage',
                    label: 'Marco Benedetti',
                    x: 70, y: 40, width: 12, height: 28,
                    type: 'person',
                    condition: { hasFlag: 'entered_theatre' },
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Marco Benedetti', portrait: '🎼',
                                text: 'Inspecteur... *accent italien* C\'est terrible. Le maestro était un génie. Difficile, oui, mais un génie.',
                                action: { addSuspect: 'marco' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Vous étiez proche de lui ?'
                            },
                            {
                                speaker: 'Marco Benedetti', portrait: '🎼',
                                text: 'Son assistant depuis 10 ans. Il me faisait confiance... à sa façon. Je devais diriger l\'orchestre l\'année prochaine.',
                                choices: [
                                    {
                                        text: '🔍 Il bloquait votre carrière ?',
                                        goto: 3
                                    },
                                    {
                                        text: '🤔 "Après ce soir, tout changera" — ça vous dit quelque chose ?',
                                        condition: { hasClue: 'partition_annotee' },
                                        goto: 5
                                    },
                                    {
                                        text: '✋ Merci Marco.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Marco Benedetti', portrait: '🎼',
                                text: 'Bloquer ? Non ! Il me formait. Oui, c\'était long, mais la patience est une vertu. Je n\'avais aucune raison de lui vouloir du mal.',
                                action: { setFlag: 'marco_denied', journal: 'Marco nie tout ressentiment envers Lefèvre malgré 10 ans comme assistant.' }
                            },
                            { speaker: 'Vous', portrait: '🕵️', text: '(Sa voix tremble. Il est sincère ou très bon acteur.)' },
                            {
                                speaker: 'Marco Benedetti', portrait: '🎼',
                                text: '*pâlit* Ce n\'est pas ce que vous croyez ! Je parlais de ma nomination ! Lefèvre avait enfin accepté de me laisser diriger un concert solo !',
                                action: { setFlag: 'marco_explained_note', journal: 'Marco affirme que sa note faisait référence à une nomination comme directeur solo.' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_seats',
                    label: 'Fauteuils d\'orchestre',
                    x: 5, y: 55, width: 90, height: 15,
                    type: 'object',
                    examineText: 'Les fauteuils sont encore en désordre. Les spectateurs sont partis en panique après l\'effondrement du maestro.'
                }
            ]
        },
        {
            id: 'backstage',
            name: 'Coulisses',
            icon: '🚪',
            scene: 'backstage',
            description: 'Les coulisses et loges des artistes.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_sylvie_loge',
                    label: 'Loge de Sylvie',
                    x: 10, y: 30, width: 25, height: 30,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'La loge de Sylvie Moreau. Violon, partitions, maquillage... et dans la poubelle...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Des gants en latex ! Pourquoi une violoniste aurait des gants en latex ? Je vais les faire analyser.',
                                action: { addClue: 'gants_latex' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_storage',
                    label: 'Débarras',
                    x: 65, y: 35, width: 20, height: 25,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un débarras plein d\'étuis à instruments, de costumes et d\'accessoires. Cherchons bien...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un étui à violon avec les initiales "S.M." — Sylvie Moreau. Et à l\'intérieur... pas de violon, mais un petit flacon.',
                                action: { addClue: 'flacon_ricin' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le flacon contient un liquide clair. L\'étiquette indique "Ricinus communis". C\'est de la ricine pure.',
                                action: { journal: 'Flacon de ricine trouvé dans l\'étui de Sylvie Moreau au débarras.' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_sylvie_person',
                    label: 'Sylvie Moreau',
                    x: 40, y: 25, width: 12, height: 30,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Sylvie Moreau', portrait: '🎻',
                                text: 'Inspecteur. *croise les bras* Je suppose que vous voulez m\'interroger comme les autres.',
                                action: { addSuspect: 'sylvie' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Vous aviez des différends avec le maestro ?'
                            },
                            {
                                speaker: 'Sylvie Moreau', portrait: '🎻',
                                text: 'Il m\'a humiliée devant tout l\'orchestre. Il m\'a traitée d\'incompétente après 8 ans de service. Mais je ne l\'ai pas tué pour autant.',
                                choices: [
                                    {
                                        text: '🔍 La caméra vous a filmée dans sa loge.',
                                        condition: { hasClue: 'camera_couloir' },
                                        goto: 3
                                    },
                                    {
                                        text: '🧪 Ces gants en latex sont à vous ?',
                                        condition: { hasClue: 'gants_latex' },
                                        goto: 5
                                    },
                                    {
                                        text: '📱 Ce SMS à un "Labo", c\'est quoi ?',
                                        condition: { hasClue: 'sms_sylvie' },
                                        goto: 7
                                    },
                                    {
                                        text: '✋ Merci Sylvie.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Sylvie Moreau', portrait: '🎻',
                                text: '...Oui, je suis entrée dans sa loge. Je voulais déposer une lettre d\'excuse. Pour faire la paix avant le concert.',
                                action: { setFlag: 'sylvie_admits_loge' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Elle dit avoir laissé une lettre... mais la caméra montre qu\'elle avait un sac en entrant et rien en sortant.)',
                                action: { journal: 'Sylvie admet être entrée dans la loge avec un sac. Prétend avoir déposé une lettre d\'excuse.' }
                            },
                            {
                                speaker: 'Sylvie Moreau', portrait: '🎻',
                                text: 'Des gants ? Je... j\'ai des problèmes de peau. J\'utilise des gants pour appliquer une crème médicale. C\'est tout.',
                                action: { setFlag: 'sylvie_explained_gloves', journal: 'Sylvie prétend utiliser des gants pour une crème médicale.' }
                            },
                            { speaker: 'Vous', portrait: '🕵️', text: '(Des gants en latex avec des traces de ricin pour une crème ? Peu crédible.)' },
                            {
                                speaker: 'Sylvie Moreau', portrait: '🎻',
                                text: '*nerveuse* C\'est... mon luthier ! Il répare mon violon. J\'avais besoin de cordes spéciales avant le concert. Rien d\'illégal !',
                                action: { setFlag: 'sylvie_sms_excuse', journal: 'Sylvie prétend que le SMS était pour son luthier. Excuse peu convaincante.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Un "luthier" qu\'elle appelle "Labo" dans ses contacts ? Les preuves s\'accumulent contre elle.)',
                            }
                        ]
                    }
                },
                {
                    id: 'hs_regisseur',
                    label: 'Le régisseur',
                    x: 85, y: 40, width: 10, height: 25,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Paul (Régisseur)', portrait: '🧑‍🔧',
                                text: 'J\'ai tout vu d\'ici, inspecteur. Je gère les coulisses depuis 20 ans.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Avez-vous remarqué quelque chose d\'inhabituel avant le concert ?'
                            },
                            {
                                speaker: 'Paul (Régisseur)', portrait: '🧑‍🔧',
                                text: 'En fait oui. J\'ai vu quelqu\'un entrer dans la loge du maestro environ 30 minutes avant le lever de rideau. Une silhouette en robe noire.',
                                action: { addClue: 'temoignage_regisseur' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Homme ou femme ?'
                            },
                            {
                                speaker: 'Paul (Régisseur)', portrait: '🧑‍🔧',
                                text: 'Difficile à dire. Il faisait sombre. Mais la personne semblait connaître les lieux. Elle n\'a pas hésité.',
                                action: { journal: 'Le régisseur a vu une silhouette en robe noire entrer dans la loge du maestro à 19h30.' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_phone',
                    label: 'Téléphone de Sylvie',
                    x: 20, y: 55, width: 10, height: 10,
                    type: 'object',
                    condition: { hasFlag: 'sylvie_admits_loge' },
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le téléphone de Sylvie est resté dans sa loge. Avec son accord, je peux y jeter un œil...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un SMS envoyé il y a 2 jours à un contact "Labo" : "C\'est prêt ? J\'en ai besoin avant vendredi." Vendredi... c\'était hier.',
                                action: { addClue: 'sms_sylvie' }
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'theatre_office',
            name: 'Bureau du Théâtre',
            icon: '🏢',
            scene: 'theatre_office',
            description: 'Le bureau administratif du directeur du théâtre.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_computer',
                    label: 'Ordinateur',
                    x: 30, y: 40, width: 25, height: 18,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'L\'ordinateur du bureau est allumé. Les e-mails du maestro sont accessibles...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un e-mail anonyme reçu il y a 3 jours : "Votre dernier concert approche, Maestro." Glaçant.',
                                action: { addClue: 'email_menace' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_filing',
                    label: 'Dossiers',
                    x: 70, y: 25, width: 20, height: 35,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Des dossiers administratifs du théâtre. Contrats, assurances, correspondance...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Une police d\'assurance vie au nom d\'Antoine Lefèvre. 3 millions d\'euros. Souscrite il y a 6 mois.',
                                action: { addClue: 'assurance_vie' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Et aussi les documents du divorce entre Hélène et Édouard. Une clause intéressante sur un versement en cas de décès...',
                                action: { addClue: 'divorce_documents' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_trash_office',
                    label: 'Corbeille à papier',
                    x: 5, y: 55, width: 12, height: 15,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Dans la corbeille... une partition froissée avec des annotations manuscrites.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'L\'écriture de Marco Benedetti. En marge : "Après ce soir, tout changera." Promesse ou menace ?',
                                action: { addClue: 'partition_annotee' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_camera_office',
                    label: 'Système de surveillance',
                    x: 5, y: 15, width: 15, height: 15,
                    type: 'object',
                    condition: { hasClue: 'temoignage_regisseur' },
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le système de vidéosurveillance du théâtre. Vérifions les images du couloir des loges...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '19h30 — on voit clairement Sylvie Moreau entrer dans la loge du maestro avec un petit sac. Elle ressort 5 minutes plus tard, les mains vides.',
                                action: { addClue: 'camera_couloir' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Le sac qu\'elle avait... elle a laissé quelque chose dans la loge. La bouteille empoisonnée peut-être ?)',
                                action: { journal: 'Vidéo : Sylvie entre dans la loge du maestro avec un sac à 19h30, ressort sans.' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_helene_person',
                    label: 'Hélène Vasseur',
                    x: 50, y: 30, width: 12, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Hélène Vasseur', portrait: '👱‍♀️',
                                text: '*froidement* Inspecteur. Je suppose que les ex-femmes sont toujours suspectes. Allez-y, posez vos questions.',
                                action: { addSuspect: 'helene' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Pourquoi étiez-vous au concert ce soir ?'
                            },
                            {
                                speaker: 'Hélène Vasseur', portrait: '👱‍♀️',
                                text: 'J\'aime la musique, inspecteur. Ce n\'est pas parce que nous avons divorcé que je dois vivre en ermite.',
                                choices: [
                                    {
                                        text: '🔍 Parlez-moi de votre divorce.',
                                        goto: 3
                                    },
                                    {
                                        text: '💰 Il y a une clause financière intéressante dans votre divorce...',
                                        condition: { hasClue: 'divorce_documents' },
                                        goto: 5
                                    },
                                    {
                                        text: '✋ Merci Hélène.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Hélène Vasseur', portrait: '👱‍♀️',
                                text: 'Édouard m\'a trompée, humiliée, et a détruit ma carrière de chanteuse. Mais c\'est du passé. J\'ai tourné la page.',
                                action: { setFlag: 'helene_divorce_talk', journal: 'Hélène garde une grande amertume envers Lefèvre malgré ce qu\'elle dit.' }
                            },
                            { speaker: 'Vous', portrait: '🕵️', text: '(Son ton dit le contraire de ses mots.)' },
                            {
                                speaker: 'Hélène Vasseur', portrait: '👱‍♀️',
                                text: '...Cette clause est standard. Mon avocat l\'a négociée. Ça ne veut pas dire que j\'ai tué Édouard pour 500 000 euros !',
                                action: { setFlag: 'helene_clause', journal: 'Hélène se défend concernant la clause de décès dans le divorce.' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_antoine_person',
                    label: 'Antoine Lefèvre',
                    x: 85, y: 35, width: 10, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Antoine Lefèvre', portrait: '👨‍🎤',
                                text: '*les yeux rouges* Mon père... je sais qu\'on ne s\'entendait pas mais... c\'était mon père quand même.',
                                action: { addSuspect: 'antoine' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Vous saviez qu\'il avait souscrit une assurance vie à votre nom ?'
                            },
                            {
                                speaker: 'Antoine Lefèvre', portrait: '👨‍🎤',
                                text: 'L\'assurance ? Oui, il m\'en avait parlé. C\'était sa façon de... compenser le fait qu\'il n\'était jamais là.',
                                choices: [
                                    {
                                        text: '🔍 3 millions, c\'est un sacré motif.',
                                        goto: 3
                                    },
                                    {
                                        text: '✋ D\'accord, merci.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Antoine Lefèvre', portrait: '👨‍🎤',
                                text: 'Vous pensez que je tuerais mon propre père pour de l\'argent ?! J\'étais au bar avec trois amis ! Vérifiez !',
                                action: { setFlag: 'antoine_alibi', journal: 'Antoine affirme avoir un alibi solide : au bar avec des amis.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Son alibi semble vérifiable. Mais l\'argent reste un mobile puissant.)',
                            }
                        ]
                    }
                }
            ]
        }
    ],

    solution: {
        culprit: 'sylvie',
        keyEvidence: ['bouteille_eau', 'gants_latex', 'flacon_ricin', 'camera_couloir', 'sms_sylvie'],
        
        endings: {
            perfect: {
                title: '🏆 Justice Parfaite !',
                text: `Votre enquête impeccable désigne Sylvie Moreau comme coupable. Confrontée aux vidéos de surveillance, aux gants contaminés, au flacon de ricine portant ses initiales et aux SMS suspects, elle finit par craquer.

Sylvie avait engagé un contact dans un laboratoire clandestin pour obtenir de la ricine. Humiliée par Lefèvre qui menaçait de la remplacer après 8 ans de carrière, elle avait décidé de se venger.

Elle est entrée dans la loge du maestro à 19h30 avec une bouteille d'eau identique à la sienne, mais empoisonnée. Elle a échangé les bouteilles et s'est débarrassée des gants dans sa propre loge.

Justice est rendue. Le monde de la musique est sous le choc.`
            },
            good: {
                title: '✅ Enquête Résolue',
                text: `Vous avez correctement identifié Sylvie Moreau, mais votre dossier manque de preuves clés. Le procès sera compliqué, mais la justice triomphera.`
            },
            wrong: {
                title: '❌ Fausse Accusation',
                text: `Vous avez accusé la mauvaise personne. Sylvie Moreau, la vraie coupable, profite de la confusion pour quitter le pays. L'affaire du Maestro restera un mystère non résolu.`
            }
        }
    },

    introDialogue: {
        nodes: [
            {
                speaker: 'Lieutenant Garcia', portrait: '👮',
                text: 'Inspecteur Morel, merci d\'être venu. Situation critique au Grand Théâtre de Lyon.'
            },
            {
                speaker: 'Lieutenant Garcia', portrait: '👮',
                text: 'Le maestro Édouard Lefèvre s\'est effondré en plein concert il y a deux heures. L\'autopsie préliminaire indique un empoisonnement au ricin.'
            },
            {
                speaker: 'Vous', portrait: '🕵️',
                text: 'Du ricin ? C\'est un poison rare et difficile à obtenir. Ce n\'est pas un crime passionnel ordinaire.'
            },
            {
                speaker: 'Lieutenant Garcia', portrait: '👮',
                text: 'Quatre personnes avaient accès aux coulisses : Sylvie Moreau la violoniste, Antoine le fils du maestro, Hélène son ex-femme, et Marco Benedetti le chef assistant.'
            },
            {
                speaker: 'Lieutenant Garcia', portrait: '👮',
                text: 'Le théâtre est bouclé. Tous les suspects sont encore sur place. Les coulisses et le bureau sont accessibles.',
                action: {
                    unlockLocation: 'backstage',
                    journal: 'Arrivée au Grand Théâtre. Le maestro Lefèvre empoisonné au ricin. Quatre suspects : Sylvie, Antoine, Hélène, Marco.'
                }
            },
            {
                speaker: 'Vous', portrait: '🕵️',
                text: 'Parfait. Je vais fouiller chaque recoin de ce théâtre. La vérité se cache dans les coulisses.',
                action: (state) => {
                    state.unlockLocation('theatre_office');
                    state.set('gamePhase', 'investigation');
                }
            }
        ]
    }
};
