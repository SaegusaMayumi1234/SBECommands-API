const weight_constant = {
  dungeon_weights: {
    catacombs: 0.0002149604615,
    healer: 0.0000045254834,
    mage: 0.0000045254834,
    berserk: 0.0000045254834,
    archer: 0.0000045254834,
    tank: 0.0000045254834,
  },
  slayer_weights: {
    zombie: {
      divider: 2208,
      modifier: 0.15,
    },
    spider: {
      divider: 2118,
      modifier: 0.08,
    },
    wolf: {
      divider: 1962,
      modifier: 0.015,
    },
    enderman: {
      divider: 1430,
      modifier: 0.017,
    },
  },
  skill_weights: {
    mining: {
      exponent: 1.18207448,
      divider: 259634,
      maxLevel: 60,
    },
    // Maxes out foraging at 850 points at level 50.
    foraging: {
      exponent: 1.232826,
      divider: 259634,
      maxLevel: 50,
    },
    // Maxes out enchanting at 450 points at level 60.
    enchanting: {
      exponent: 0.96976583,
      divider: 882758,
      maxLevel: 60,
    },
    // Maxes out farming at 2,200 points at level 60.
    farming: {
      exponent: 1.217848139,
      divider: 220689,
      maxLevel: 60,
    },
    // Maxes out combat at 1,500 points at level 60.
    combat: {
      exponent: 1.15797687265,
      divider: 275862,
      maxLevel: 60,
    },
    // Maxes out fishing at 2,500 points at level 50.
    fishing: {
      exponent: 1.406418,
      divider: 88274,
      maxLevel: 50,
    },
    // Maxes out alchemy at 200 points at level 50.
    alchemy: {
      exponent: 1.0,
      divider: 1103448,
      maxLevel: 50,
    },
    // Maxes out taming at 500 points at level 50.
    taming: {
      exponent: 1.14744,
      divider: 441379,
      maxLevel: 50,
    },
    // Sets up carpentry and runecrafting without any weight components.
    carpentry: {
      exponent: null,
      divider: null,
      maxLevel: 50,
    },
    runecrafting: {
      exponent: null,
      divider: null,
      maxLevel: 25,
    },
  },
};

export default {
  calculateDungeonWeight: function calculateDungeonWeight(type: keyof typeof weight_constant.dungeon_weights, level: number, experience: number) {
    const percentageModifier = weight_constant.dungeon_weights[type];
    const level50Experience = 569809640;

    const base = Math.pow(level, 4.5) * percentageModifier;

    if (experience <= level50Experience) {
      return { weight: base, weight_overflow: 0 };
    }

    const remaining = experience - level50Experience;
    const splitter = (4 * level50Experience) / base;

    return {
      weight: Math.floor(base),
      weight_overflow: Math.pow(remaining / splitter, 0.968),
    };
  },
  calculateSkillWeight: function calculateSkillWeight(type: keyof typeof weight_constant.skill_weights, level: number, experience: number) {
    const skillGroup = weight_constant.skill_weights[type];
    if (!skillGroup.exponent || !skillGroup.divider || !level) {
      return { weight: 0, weight_overflow: 0 };
    }

    const maxSkillLevelXP = skillGroup.maxLevel === 60 ? 111672425 : 55172425;

    let base = Math.pow(level * 10, 0.5 + skillGroup.exponent + level / 100) / 1250;
    base = experience > maxSkillLevelXP ? Math.round(base) : base;

    return {
      weight: base,
      weight_overflow: experience <= maxSkillLevelXP ? 0 : Math.pow((experience - maxSkillLevelXP) / skillGroup.divider, 0.968),
    };
  },
  calculateSlayerWeight: function calculateSlayerWeight(type: keyof typeof weight_constant.slayer_weights, experience: number) {
    const slayerWeight = weight_constant.slayer_weights[type];

    if (!experience || experience <= 1000000) {
      return { weight: experience ? experience / slayerWeight.divider : 0, weight_overflow: 0 };
    }

    const base = 1000000 / slayerWeight.divider;
    let remaining = experience - 1000000;

    let { modifier } = slayerWeight;
    let overflow = 0;

    while (remaining > 0) {
      const left = Math.min(remaining, 1000000);
      overflow += Math.pow(left / (slayerWeight.divider * (1.5 + modifier)), 0.942);
      modifier += slayerWeight.modifier;
      remaining -= left;
    }

    return { weight: base, weight_overflow: overflow };
  },
};
