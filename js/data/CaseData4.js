/**
 * CaseData4.js — "Le Secret du Musée"
 * Un vol spectaculaire au musée tourne au meurtre. Le gardien de nuit est retrouvé mort.
 */
window.CASE_DATA_4 = {
    id: 'case_4',
    title: 'Le Secret du Musée',
    subtitle: 'Vol et meurtre au Musée des Beaux-Arts',
    difficulty: '⭐⭐⭐',
    intro: `Le Musée des Beaux-Arts de Bordeaux est le théâtre d'un double crime : un tableau de maître d'une valeur de 8 millions d'euros a disparu, 
et le gardien de nuit, Georges Vidal, a été retrouvé mort dans la salle d'exposition.
L'alarme n'a jamais sonné. C'est forcément un coup de l'intérieur.`,

    suspects: [
        {
            id: 'diane',
            name: 'Diane Marchal',
            role: 'Conservatrice en chef',
            emoji: '👩‍💼',
            description: 'Conservatrice depuis 12 ans. Spécialiste du tableau volé. Criblée de dettes de jeu secrètes.',
            alibi: 'Affirme être restée au musée tard pour préparer une exposition mais être partie à 21h.'
        },
        {
            id: 'thomas',
            name: 'Thomas Bruel',
            role: 'Technicien sécurité',
            emoji: '🔧',
            description: 'Responsable du système de sécurité du musée depuis 5 ans. A accès à toutes les caméras et alarmes.',
            alibi: 'Était de repos cette nuit-là. Dit être resté chez lui.'
        },
        {
            id: 'sofia',
            name: 'Sofia Chen',
            role: 'Restauratrice d\'art',
            emoji: '🎨',
            description: 'Restauratrice freelance engagée pour restaurer le tableau volé. A eu un accès privilégié à l\'œuvre pendant des semaines.',
            alibi: 'Prétend être rentrée chez elle après sa journée de travail à 18h.'
        },
        {
            id: 'philippe',
            name: 'Philippe Arnaud',
            role: 'Collectionneur privé',
            emoji: '🎩',
            description: 'Richissime collectionneur qui avait fait une offre refusée de 10 millions pour le tableau. Mécène du musée.',
            alibi: 'Affirme avoir dîné dans un restaurant gastronomique jusqu\'à 23h.'
        }
    ],

    clues: [
        {
            id: 'alarme_desactivee',
            name: 'Alarme désactivée',
            description: 'Le système d\'alarme de la salle du tableau a été désactivé avec un code d\'accès administrateur à 22h47. Seuls Thomas et Diane connaissent ce code.',
            shortDesc: 'Alarme coupée à 22h47 avec code admin',
            location: 'museum_security',
            category: 'forensic'
        },
        {
            id: 'copie_tableau',
            name: 'Tableau est une copie',
            description: 'Sofia avait secrètement réalisé une copie parfaite du tableau pendant la restauration. La copie devait remplacer l\'original.',
            shortDesc: 'Copie parfaite faite par Sofia',
            location: 'museum_workshop',
            category: 'physical'
        },
        {
            id: 'badge_thomas',
            name: 'Badge d\'accès',
            description: 'Le badge de Thomas a été utilisé à 22h30 pour entrer dans le musée. Mais Thomas dit être resté chez lui.',
            shortDesc: 'Badge de Thomas utilisé à 22h30',
            location: 'museum_security',
            category: 'forensic'
        },
        {
            id: 'email_contact',
            name: 'E-mail à un receleur',
            description: 'Un e-mail trouvé sur le PC du musée, envoyé depuis le compte de Diane, à un contact connu d\'Interpol comme receleur d\'art : "Le colis sera prêt vendredi."',
            shortDesc: 'E-mail de Diane à un receleur d\'art',
            location: 'museum_office',
            category: 'document'
        },
        {
            id: 'dettes_diane',
            name: 'Relevés bancaires',
            description: 'Des relevés bancaires montrent que Diane doit 200 000€ à un casino en ligne. Elle est au bord de la faillite personnelle.',
            shortDesc: 'Dettes de jeu de 200 000€',
            location: 'museum_office',
            category: 'document'
        },
        {
            id: 'fibre_textile',
            name: 'Fibre textile',
            description: 'Des fibres d\'un tissu rare (soie de Chine) trouvées sur le cadre vide du tableau. Ce tissu correspond au foulard que porte habituellement Diane.',
            shortDesc: 'Fibres de soie identiques au foulard de Diane',
            location: 'museum_gallery',
            category: 'forensic'
        },
        {
            id: 'camera_parking',
            name: 'Vidéo du parking',
            description: 'La caméra du parking montre la voiture de Diane entrant à 22h20 et ressortant à 23h15 avec un long paquet à l\'arrière.',
            shortDesc: 'Voiture de Diane au parking de nuit',
            location: 'museum_security',
            category: 'forensic'
        },
        {
            id: 'cle_usb',
            name: 'Clé USB cachée',
            description: 'Une clé USB trouvée dans le tiroir de Thomas contenant les plans de sécurité complets du musée et un message chiffré.',
            shortDesc: 'Clé USB avec plans de sécurité',
            location: 'museum_security',
            category: 'document'
        },
        {
            id: 'cause_mort',
            name: 'Rapport d\'autopsie',
            description: 'Georges Vidal est mort d\'un traumatisme crânien. L\'arme : un presse-papier en bronze en forme de lion, trouvé ensanglanté dans la salle.',
            shortDesc: 'Mort par coup de presse-papier en bronze',
            location: 'museum_gallery',
            category: 'forensic'
        },
        {
            id: 'empreintes_pressepapier',
            name: 'Empreintes sur le presse-papier',
            description: 'Le presse-papier porte les empreintes de Diane Marchal. C\'est l\'arme du crime.',
            shortDesc: 'Empreintes de Diane sur l\'arme du crime',
            location: 'museum_gallery',
            category: 'forensic'
        }
    ],

    locations: [
        {
            id: 'museum_entrance',
            name: 'Hall du Musée',
            icon: '🏛️',
            scene: 'mansion_entrance',
            description: 'L\'entrée monumentale du Musée des Beaux-Arts.',
            unlocked: true,
            hotspots: [
                {
                    id: 'hs_entrance_hall',
                    label: 'Entrer dans le musée',
                    x: 35, y: 30, width: 30, height: 25,
                    type: 'object',
                    examineText: 'Le hall est sous scellés. Des rubans de police barrent l\'accès à la galerie principale. Vous montrez votre badge.',
                    unlockLocation: 'museum_gallery',
                    flag: 'entered_museum'
                },
                {
                    id: 'hs_reception',
                    label: 'Accueil',
                    x: 5, y: 50, width: 20, height: 15,
                    type: 'object',
                    examineText: 'Le registre des visiteurs de la veille. Rien d\'anormal dans les entrées du jour. Le musée a fermé à 18h comme d\'habitude.'
                }
            ]
        },
        {
            id: 'museum_gallery',
            name: 'Salle d\'Exposition',
            icon: '🖼️',
            scene: 'living_room',
            description: 'La salle où le tableau a été volé et Georges retrouvé mort.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_frame',
                    label: 'Cadre vide',
                    x: 30, y: 15, width: 40, height: 35,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le cadre vide. "L\'Aube Dorée" de Jean-Baptiste Mercier, valeur estimée 8 millions d\'euros. Décroché proprement.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Des fibres textiles sur le rebord du cadre. De la soie de Chine. Un tissu rare et coûteux.',
                                action: { addClue: 'fibre_textile' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_body_area',
                    label: 'Zone du corps',
                    x: 50, y: 55, width: 25, height: 18,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Georges Vidal, 58 ans, gardien de nuit depuis 20 ans. Retrouvé ici, au pied du mur du tableau volé.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'L\'autopsie préliminaire : mort par traumatisme crânien. Un coup violent à l\'arrière de la tête.',
                                action: { addClue: 'cause_mort' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_weapon',
                    label: 'Presse-papier ensanglanté',
                    x: 10, y: 60, width: 15, height: 12,
                    type: 'object',
                    condition: { hasClue: 'cause_mort' },
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un presse-papier en bronze en forme de lion. Du sang séché. C\'est l\'arme du crime.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Des empreintes claires dessus. Je les fais analyser immédiatement... ce sont celles de Diane Marchal, la conservatrice.',
                                action: { addClue: 'empreintes_pressepapier' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Les empreintes de Diane sur l\'arme du crime. C\'est accablant.)',
                                action: { journal: 'Empreintes de Diane Marchal sur l\'arme du meurtre.' }
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'museum_security',
            name: 'Salle de Sécurité',
            icon: '📹',
            scene: 'study',
            description: 'La salle de contrôle avec les écrans de surveillance.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_screens',
                    label: 'Écrans de surveillance',
                    x: 15, y: 20, width: 50, height: 30,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Les écrans montrent toutes les salles du musée. Mais les enregistrements de la nuit du crime ont été effacés.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Effacés... sauf la caméra du parking extérieur, qui est sur un système séparé. Voyons voir...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '22h20 : la voiture de Diane Marchal entre au parking. 23h15 : elle repart avec un long paquet à l\'arrière. Le tableau !',
                                action: { addClue: 'camera_parking' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_alarm_log',
                    label: 'Journal des alarmes',
                    x: 70, y: 25, width: 20, height: 20,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le journal du système d\'alarme. Voyons les événements de cette nuit...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '22h47 — Alarme salle 3 désactivée. Code administrateur utilisé. Seuls Thomas Bruel et Diane Marchal connaissent ce code.',
                                action: { addClue: 'alarme_desactivee' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_badge_log',
                    label: 'Registre des badges',
                    x: 15, y: 55, width: 20, height: 15,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le registre des passages par badge magnétique...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '22h30 : badge de Thomas Bruel utilisé à l\'entrée de service. Mais Thomas dit être chez lui cette nuit-là...',
                                action: { addClue: 'badge_thomas' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_thomas_desk',
                    label: 'Bureau de Thomas',
                    x: 50, y: 55, width: 20, height: 18,
                    type: 'object',
                    condition: { hasClue: 'badge_thomas' },
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le bureau de Thomas. Fouillons ses tiroirs...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Une clé USB cachée sous un faux fond de tiroir. Elle contient les plans de sécurité complets du musée et un fichier chiffré.',
                                action: { addClue: 'cle_usb' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Thomas avait les plans de sécurité sur une clé USB privée ? C\'est suspect, mais cela fait-il de lui le meurtrier ?)',
                                action: { journal: 'Clé USB de Thomas avec plans de sécurité. Complice potentiel du vol.' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_thomas_person',
                    label: 'Thomas Bruel',
                    x: 85, y: 30, width: 10, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Thomas Bruel', portrait: '🔧',
                                text: 'Inspecteur. Je suis choqué par ce qui est arrivé à Georges. C\'était un type bien.',
                                action: { addSuspect: 'thomas' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Vous étiez de repos cette nuit ?'
                            },
                            {
                                speaker: 'Thomas Bruel', portrait: '🔧',
                                text: 'Oui, j\'étais chez moi. J\'ai appris la nouvelle ce matin.',
                                choices: [
                                    {
                                        text: '🔍 Votre badge a été utilisé à 22h30.',
                                        condition: { hasClue: 'badge_thomas' },
                                        goto: 3
                                    },
                                    {
                                        text: '💾 Cette clé USB est à vous ?',
                                        condition: { hasClue: 'cle_usb' },
                                        goto: 5
                                    },
                                    {
                                        text: '✋ D\'accord.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Thomas Bruel', portrait: '🔧',
                                text: '*pâlit* Mon badge ? Mais... je l\'avais dans mon casier ! Quelqu\'un a dû le prendre. Je jure que je n\'étais pas au musée !',
                                action: { setFlag: 'thomas_badge_excuse', journal: 'Thomas prétend que quelqu\'un a volé son badge dans son casier.' }
                            },
                            { speaker: 'Vous', portrait: '🕵️', text: '(Son badge volé ? Pratique comme excuse. Mais pas impossible.)' },
                            {
                                speaker: 'Thomas Bruel', portrait: '🔧',
                                text: '...D\'accord. Les plans de sécurité, c\'est pour un audit que je préparais. Le fichier chiffré, c\'est... personnel.',
                                action: { setFlag: 'thomas_usb_excuse', journal: 'Thomas justifie la clé USB par un "audit". Le fichier chiffré reste mystérieux.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Des plans de sécurité sur une clé privée et un fichier chiffré... Thomas cache quelque chose, mais est-ce le meurtre ou juste le vol ?)',
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 'museum_office',
            name: 'Bureau de la Conservation',
            icon: '🗄️',
            scene: 'office',
            description: 'Le bureau de Diane Marchal et de l\'administration du musée.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_diane_computer',
                    label: 'Ordinateur de Diane',
                    x: 25, y: 40, width: 30, height: 18,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'L\'ordinateur de Diane. Ses e-mails sont encore ouverts...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Un e-mail envoyé il y a 5 jours à un certain "V. Karpov" — nom connu d\'Interpol comme receleur d\'art international : "Le colis sera prêt vendredi."',
                                action: { addClue: 'email_contact' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Diane était en contact avec un receleur. Elle planifiait le vol du tableau.)',
                                action: { journal: 'E-mail de Diane à un receleur d\'art connu. Le vol était prémédité.' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_diane_drawer',
                    label: 'Tiroir de Diane',
                    x: 60, y: 50, width: 15, height: 12,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le tiroir personnel de Diane. Des relevés bancaires cachés sous des dossiers...'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Des dettes colossales. 200 000 euros à un casino en ligne. Diane était au bord de la ruine.',
                                action: { addClue: 'dettes_diane' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_diane_person',
                    label: 'Diane Marchal',
                    x: 80, y: 30, width: 12, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Diane Marchal', portrait: '👩‍💼',
                                text: 'Inspecteur. Ce vol est une catastrophe. Ce tableau était l\'âme de notre collection.',
                                action: { addSuspect: 'diane' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Vous étiez au musée hier soir jusqu\'à quelle heure ?'
                            },
                            {
                                speaker: 'Diane Marchal', portrait: '👩‍💼',
                                text: 'Vers 21h. Je préparais la prochaine exposition. Puis je suis rentrée chez moi.',
                                choices: [
                                    {
                                        text: '📹 Votre voiture au parking à 22h20...',
                                        condition: { hasClue: 'camera_parking' },
                                        goto: 3
                                    },
                                    {
                                        text: '📧 Cet e-mail à V. Karpov...',
                                        condition: { hasClue: 'email_contact' },
                                        goto: 5
                                    },
                                    {
                                        text: '🔍 Vos empreintes sur l\'arme du crime.',
                                        condition: { hasClue: 'empreintes_pressepapier' },
                                        goto: 7
                                    },
                                    {
                                        text: '💰 200 000€ de dettes de jeu...',
                                        condition: { hasClue: 'dettes_diane' },
                                        goto: 9
                                    },
                                    {
                                        text: '✋ Merci Diane.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Diane Marchal', portrait: '👩‍💼',
                                text: '...J\'avais oublié des documents. Je suis revenue les chercher. C\'est tout. Je n\'ai rien vu d\'anormal.',
                                action: { setFlag: 'diane_returned', journal: 'Diane admet être revenue au musée à 22h20. Contredit son alibi initial.' }
                            },
                            { speaker: 'Vous', portrait: '🕵️', text: '(Revenue à 22h20 et repartie à 23h15 avec un paquet. Très suspect.)' },
                            {
                                speaker: 'Diane Marchal', portrait: '👩‍💼',
                                text: '*choc* C\'est... quelqu\'un a utilisé mon compte ! Mon mot de passe a dû être piraté. Je n\'ai jamais contacté cette personne !',
                                action: { setFlag: 'diane_email_deny', journal: 'Diane nie avoir envoyé l\'e-mail au receleur. Prétend être piratée.' }
                            },
                            { speaker: 'Vous', portrait: '🕵️', text: '(Piratée ? L\'e-mail a été envoyé depuis son poste au musée.)' },
                            {
                                speaker: 'Diane Marchal', portrait: '👩‍💼',
                                text: 'Le presse-papier est sur mon bureau ! Bien sûr qu\'il a mes empreintes. Tout le monde le sait. Ça ne prouve rien !',
                                action: { setFlag: 'diane_weapon_excuse', journal: 'Diane justifie ses empreintes sur l\'arme : c\'est son presse-papier habituel.' }
                            },
                            { speaker: 'Vous', portrait: '🕵️', text: '(Son presse-papier retrouvé ensanglanté dans la galerie, loin de son bureau... déplacé.)' },
                            {
                                speaker: 'Diane Marchal', portrait: '👩‍💼',
                                text: '*s\'effondre* Mes dettes... oui, j\'ai des problèmes financiers. Mais je n\'aurais jamais tué Georges. C\'était le vol qui devait tout résoudre, pas...',
                                action: { setFlag: 'diane_almost_confesses', journal: 'Diane laisse échapper que le vol devait "tout résoudre". Aveu partiel.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '("Le vol devait tout résoudre"... elle vient quasiment d\'avouer le vol. Et le meurtre ?)',
                            }
                        ]
                    }
                },
                {
                    id: 'hs_philippe_person',
                    label: 'Philippe Arnaud',
                    x: 5, y: 35, width: 12, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Philippe Arnaud', portrait: '🎩',
                                text: '*ajuste ses lunettes* Inspecteur. Ce tableau est une perte inestimable pour le patrimoine français.',
                                action: { addSuspect: 'philippe' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Vous aviez proposé 10 millions pour ce tableau, et le musée a refusé.'
                            },
                            {
                                speaker: 'Philippe Arnaud', portrait: '🎩',
                                text: 'Exact. Mais je suis collectionneur, pas voleur. Mon offre était légale et transparente.',
                                choices: [
                                    {
                                        text: '🔍 Où étiez-vous cette nuit ?',
                                        goto: 3
                                    },
                                    {
                                        text: '✋ Merci Monsieur Arnaud.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Philippe Arnaud', portrait: '🎩',
                                text: 'Au restaurant Le Chapon Fin, avec trois associés. Le maître d\'hôtel pourra confirmer. Je n\'ai rien à cacher.',
                                action: { setFlag: 'philippe_alibi', journal: 'Philippe a un alibi vérifiable : dîner au restaurant Le Chapon Fin.' }
                            },
                            { speaker: 'Vous', portrait: '🕵️', text: '(Son alibi semble solide. Mais un homme de sa fortune pourrait payer quelqu\'un d\'autre pour agir...)' }
                        ]
                    }
                }
            ]
        },
        {
            id: 'museum_workshop',
            name: 'Atelier de Restauration',
            icon: '🎨',
            scene: 'kitchen',
            description: 'L\'atelier où Sofia restaurait le tableau volé.',
            unlocked: false,
            hotspots: [
                {
                    id: 'hs_easel',
                    label: 'Chevalet',
                    x: 30, y: 25, width: 25, height: 35,
                    type: 'object',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Le chevalet de Sofia. Des pigments, pinceaux, solvants... et une toile retournée contre le mur.'
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'C\'est... une copie parfaite du tableau volé ! Même dimensions, même technique. Un travail remarquable.',
                                action: { addClue: 'copie_tableau' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: '(Sofia a réalisé une copie du tableau qu\'elle restaurait. Pour le remplacer discrètement ?)',
                                action: { journal: 'Copie parfaite du tableau trouvée dans l\'atelier de Sofia.' }
                            }
                        ]
                    }
                },
                {
                    id: 'hs_sofia_person',
                    label: 'Sofia Chen',
                    x: 65, y: 35, width: 12, height: 28,
                    type: 'person',
                    dialogue: {
                        nodes: [
                            {
                                speaker: 'Sofia Chen', portrait: '🎨',
                                text: 'Ce tableau était mon chef-d\'œuvre de restauration. 6 mois de travail minutieux. Et maintenant il a disparu.',
                                action: { addSuspect: 'sofia' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'Parlez-moi de cette copie que j\'ai trouvée.',
                                condition: { hasClue: 'copie_tableau' }
                            },
                            {
                                speaker: 'Sofia Chen', portrait: '🎨',
                                text: 'La copie ? C\'est un exercice technique ! Tous les restaurateurs font ça pour comprendre la technique du maître. Ce n\'est pas un crime !',
                                choices: [
                                    {
                                        text: '🔍 Diane savait pour la copie ?',
                                        goto: 3
                                    },
                                    {
                                        text: '✋ Je comprends.',
                                        goto: 'end'
                                    }
                                ]
                            },
                            {
                                speaker: 'Sofia Chen', portrait: '🎨',
                                text: 'Diane ? Oui, elle savait. Elle m\'a même demandé de... non, oubliez.',
                                action: { setFlag: 'sofia_slip', journal: 'Sofia laisse entendre que Diane lui avait demandé quelque chose concernant la copie.' }
                            },
                            {
                                speaker: 'Vous', portrait: '🕵️',
                                text: 'De quoi ? De faire la copie pour remplacer l\'original ?'
                            },
                            {
                                speaker: 'Sofia Chen', portrait: '🎨',
                                text: '*soupir* ...Diane m\'a demandé de faire une copie parfaite. Je pensais que c\'était pour l\'exposition itinérante. Je... je ne savais pas qu\'elle préparait un vol.',
                                action: { setFlag: 'sofia_confessed', journal: 'Sofia avoue : Diane lui a commandé la copie. Sofia ignorait le plan de vol.' }
                            }
                        ]
                    }
                }
            ]
        }
    ],

    solution: {
        culprit: 'diane',
        keyEvidence: ['empreintes_pressepapier', 'camera_parking', 'email_contact', 'dettes_diane', 'alarme_desactivee'],
        
        endings: {
            perfect: {
                title: '🏆 Justice Parfaite !',
                text: `Les preuves sont accablantes. Diane Marchal est arrêtée et confrontée : ses empreintes sur l'arme du crime, la vidéo de sa voiture au parking, l'e-mail au receleur, ses dettes de jeu... elle finit par tout avouer.

Diane avait planifié le vol depuis des mois pour rembourser ses dettes de jeu. Elle a utilisé le badge de Thomas (volé dans son casier) et son code admin pour désactiver l'alarme. Sofia avait réalisé la copie sans savoir qu'elle était destinée à prendre la place de l'original.

Le meurtre n'était pas prévu. Georges Vidal l'a surprise en train de décrocher le tableau. Prise de panique, elle l'a frappé avec le presse-papier qu'elle avait dans son sac.

Thomas Bruel est arrêté comme complice — il avait accepté de ne pas travailler cette nuit-là et de "perdre" son badge en échange de 50 000€.

Le tableau est retrouvé chez le receleur Karpov grâce à la coopération d'Interpol.`
            },
            good: {
                title: '✅ Enquête Résolue',
                text: `Vous avez identifié Diane comme coupable, mais certaines preuves clés manquent. Le procès sera long, mais la justice finira par triompher.`
            },
            wrong: {
                title: '❌ Fausse Accusation',
                text: `Mauvais suspect ! Pendant que la justice s'égare, Diane Marchal prend la fuite avec les 8 millions du tableau. Georges Vidal n'aura pas la justice qu'il méritait. Le musée perd son chef-d'œuvre à jamais.`
            }
        }
    },

    introDialogue: {
        nodes: [
            {
                speaker: 'Commandant Fabre', portrait: '👮',
                text: 'Inspecteur Morel, double affaire au Musée des Beaux-Arts. Vol d\'un tableau de maître ET un gardien de nuit assassiné.'
            },
            {
                speaker: 'Commandant Fabre', portrait: '👮',
                text: '"L\'Aube Dorée" de Jean-Baptiste Mercier : 8 millions d\'euros, envolée. Georges Vidal, le gardien, retrouvé mort dans la salle.'
            },
            {
                speaker: 'Vous', portrait: '🕵️',
                text: 'L\'alarme n\'a pas sonné ?'
            },
            {
                speaker: 'Commandant Fabre', portrait: '👮',
                text: 'Non. Le système a été désactivé de l\'intérieur. C\'est forcément quelqu\'un qui connaît le musée. Nous avons quatre suspects.'
            },
            {
                speaker: 'Commandant Fabre', portrait: '👮',
                text: 'Diane Marchal la conservatrice, Thomas Bruel le technicien sécurité, Sofia Chen la restauratrice, et Philippe Arnaud un collectionneur qui voulait le tableau.',
                action: {
                    unlockLocation: 'museum_security',
                    journal: 'Double crime au musée : vol du tableau "L\'Aube Dorée" (8M€) et meurtre de Georges Vidal. Suspects : Diane, Thomas, Sofia, Philippe.'
                }
            },
            {
                speaker: 'Vous', portrait: '🕵️',
                text: 'Vol et meurtre... le gardien devait être au mauvais endroit au mauvais moment. Commençons l\'enquête.',
                action: (state) => {
                    state.unlockLocation('museum_office');
                    state.unlockLocation('museum_workshop');
                    state.set('gamePhase', 'investigation');
                }
            }
        ]
    }
};
