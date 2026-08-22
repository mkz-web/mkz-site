/**
 * FICHIER GENERE PAR build/build.mjs. NE PAS EDITER A LA MAIN.
 * Source de verite : data/*.yaml
 * Regenerer : node build/build.mjs
 */

export const DATASET = {
  "models": {
    "version": "0.3.0",
    "updated": "2026-08-15",
    "status": "sourced",
    "ratio_prefill": 8,
    "chars_per_token": 3.6,
    "base_tokens_out": 500,
    "fixed_overhead_wh": [
      0.005,
      0.02,
      0.08
    ],
    "classes": {
      "petit": {
        "label": "Petit modèle",
        "examples": "GPT-4o mini, Gemini Flash, Mistral Small, Llama 3 8B",
        "wh_per_output_token": [
          0.00007,
          0.0001,
          0.0002
        ],
        "output_multiplier": 1
      },
      "moyen": {
        "label": "Modèle courant",
        "examples": "GPT-4o, Gemini Pro, Claude Sonnet, Mistral Large",
        "wh_per_output_token": [
          0.0003,
          0.0008,
          0.0025
        ],
        "output_multiplier": 1
      },
      "grand": {
        "label": "Grand modèle",
        "examples": "GPT-4.5, Claude Opus, Llama 3 405B",
        "wh_per_output_token": [
          0.0012,
          0.003,
          0.012
        ],
        "output_multiplier": 1
      },
      "raisonnement": {
        "label": "Modèle de raisonnement",
        "examples": "o3, Gemini Thinking, DeepSeek R1, Claude en mode réflexion",
        "wh_per_output_token": [
          0.0012,
          0.003,
          0.012
        ],
        "output_multiplier": 11
      }
    },
    "reference_web_search": {
      "label": "Recherche web classique",
      "wh_per_query": [
        0.15,
        0.3,
        0.6
      ]
    }
  },
  "grid": {
    "version": "0.3.0",
    "updated": "2026-08-15",
    "status": "sourced",
    "dynamic": {
      "supported": false,
      "candidate_source": "RTE eCO2mix",
      "note": "Hors perimetre v1. Remplir hourly_override pour injecter une mesure."
    },
    "regions": {
      "fr": {
        "label": "France",
        "detail": "Mix majoritairement nucléaire et renouvelable",
        "factors_g_per_kwh": [
          25,
          41,
          90
        ],
        "hourly_override": null
      },
      "eu": {
        "label": "Union européenne",
        "detail": "Moyenne des 27 États membres",
        "factors_g_per_kwh": [
          150,
          210,
          320
        ],
        "hourly_override": null
      },
      "us": {
        "label": "États-Unis",
        "detail": "Moyenne nationale, forte part de gaz et de charbon",
        "factors_g_per_kwh": [
          330,
          384,
          500
        ],
        "hourly_override": null
      },
      "monde": {
        "label": "Moyenne mondiale",
        "detail": "Valeur par défaut quand la région du centre de données est inconnue",
        "factors_g_per_kwh": [
          400,
          477,
          580
        ],
        "hourly_override": null
      }
    }
  },
  "embodied": {
    "version": "0.3.0",
    "updated": "2026-08-15",
    "status": "sourced",
    "manufacturing_g_per_kwh": [
      15,
      50,
      130
    ],
    "note": "Écart large assumé. Les analyses de cycle de vie publiées divergent surtout sur la durée d'amortissement retenue pour les accélérateurs, entre trois et six ans, et sur le taux d'utilisation moyen des parcs."
  },
  "water": {
    "version": "0.3.0",
    "updated": "2026-08-15",
    "status": "sourced",
    "litres_per_kwh": [
      0.8,
      1.9,
      4.3
    ],
    "breakdown": {
      "refroidissement_direct": "WUE on-site 0,09 à 0,99 L/kWh selon le fournisseur (EcoLogits, 2026)",
      "production_electrique": "Jusqu'à 3,1 L/kWh consommés par le réseau américain, hydraulique inclus (Li et al. 2025)"
    },
    "note": "Un centre de données en circuit fermé peut descendre très bas sur le refroidissement direct tout en restant exposé sur la production électrique. L'écart entre les bornes traduit cette variabilité géographique, et le traitement comptable de l'évaporation des barrages explique une grande part des divergences entre publications."
  },
  "equivalences": {
    "version": "0.3.0",
    "updated": "2026-08-15",
    "status": "sourced",
    "energy": [
      {
        "id": "led",
        "singular": "minute d'ampoule LED allumée",
        "plural": "minutes d'ampoule LED allumée",
        "value_wh": 0.15,
        "basis": "Ampoule LED de 9 W pendant une minute (calcul direct)"
      },
      {
        "id": "smartphone",
        "singular": "charge complète de smartphone",
        "plural": "charges complètes de smartphone",
        "value_wh": 18,
        "basis": "Batterie de 15 Wh (4 000 mAh sous 3,85 V) rechargée du mur, pertes de charge d'environ 20 % incluses"
      },
      {
        "id": "bouilloire",
        "singular": "litre d'eau porté à ébullition",
        "plural": "litres d'eau portés à ébullition",
        "value_wh": 110,
        "basis": "Élévation de 1 L de 15 à 100 degrés (99 Wh utiles), rendement bouilloire 90 %"
      },
      {
        "id": "box",
        "singular": "journée de box internet allumée",
        "plural": "journées de box internet allumée",
        "value_wh": 240,
        "basis": "Box de 10 W en fonctionnement continu pendant 24 h (calcul direct)"
      }
    ],
    "co2e": [
      {
        "id": "voiture",
        "singular": "mètre parcouru en voiture thermique",
        "plural": "mètres parcourus en voiture thermique",
        "value_g": 0.142,
        "basis": "142 g CO2e par km en voiture thermique, impactco2.fr (ADEME), relevé le 15/08/2026"
      },
      {
        "id": "tgv",
        "singular": "kilomètre parcouru en TGV",
        "plural": "kilomètres parcourus en TGV",
        "value_g": 2.9,
        "basis": "2,9 g CO2e par km par passager en TGV, impactco2.fr (ADEME), relevé le 15/08/2026"
      },
      {
        "id": "voiture_km",
        "singular": "kilomètre parcouru en voiture thermique",
        "plural": "kilomètres parcourus en voiture thermique",
        "value_g": 142,
        "basis": "142 g CO2e par km en voiture thermique, impactco2.fr (ADEME), relevé le 15/08/2026. Remplace la tasse de café de la v0.2.0, restée sans source vérifiable"
      }
    ]
  },
  "version": "0.3.0",
  "updated": "2026-08-15"
};
