export default {
  colorToCode: {
    BLACK: '0',
    DARK_BLUE: '1',
    DARK_GREEN: '2',
    DARK_AQUA: '3',
    DARK_RED: '4',
    DARK_PURPLE: '5',
    GOLD: '6',
    GRAY: '7',
    DARK_GRAY: '8',
    BLUE: '9',
    GREEM: 'a',
    AQUA: 'b',
    RED: 'c',
    LIGHT_PURPLE: 'd',
    YELLOW: 'e',
    WHITE: 'f',
    RESET: 'r',
  },
  guildExpNeeded: [100000, 150000, 250000, 500000, 750000, 1000000, 1250000, 1500000, 2000000, 2500000, 2500000, 2500000, 2500000, 2500000, 3000000],
  games: {
    QUAKECRAFT: {
      modeNames: {
        teams: 'Teams',
        solo: 'Solo',
        solo_tourney: 'Solo (Tournament)',
      },
      legacy: true,
      databaseName: 'Quake',
      name: 'Quakecraft',
      id: 2,
    },
    SKYCLASH: {
      databaseName: 'SkyClash',
      name: 'SkyClash',
      retired: true,
      id: 55,
    },
    BUILD_BATTLE: {
      modeNames: {
        BUILD_BATTLE_HALLOWEEN: 'Halloween Hyper',
        BUILD_BATTLE_CHRISTMAS_NEW_TEAMS: 'Holiday Teams',
        BUILD_BATTLE_SOLO_NORMAL_LATEST: 'Solo (1.14+)',
        BUILD_BATTLE_GUESS_THE_BUILD: 'Guess The Build',
        BUILD_BATTLE_TEAMS_NORMAL: 'Teams',
        BUILD_BATTLE_SOLO_NORMAL: 'Solo',
        BUILD_BATTLE_SOLO_PRO: 'Pro',
        BUILD_BATTLE_CHRISTMAS_NEW_SOLO: 'Holiday Solo',
        BUILD_BATTLE_CHRISTMAS: 'Christmas',
      },
      databaseName: 'BuildBattle',
      name: 'Build Battle',
      id: 60,
    },
    UHC: {
      databaseName: 'UHC',
      name: 'UHC Champions',
      id: 20,
    },
    LEGACY: {
      databaseName: 'Legacy',
      name: 'Classic Games',
      id: 56,
    },
    SKYBLOCK: {
      modeNames: {
        farming_1: 'The Farming Islands',
        crystal_hollows: 'Crystal Hollows',
        winter: "Jerry's Workshop",
        foraging_1: 'The Park',
        dark_auction: 'Dark Auction',
        dungeon: 'Dungeons',
        combat_3: 'The End',
        crismon_isle: 'Crimson Isle',
        hub: 'Hub',
        instanced: "Kuudra's Hollow",
        dynamic: 'Private Island',
        mining_3: 'Dwarven Mines',
        garden: 'The Garden',
        mining_1: 'Gold Mine',
        combat_2: 'Blazing Fortress',
        mining_2: 'Deep Caverns',
        combat_1: "Spider's Den",
      },
      databaseName: 'SkyBlock',
      name: 'SkyBlock',
      id: 63,
    },
    HOUSING: {
      databaseName: 'Housing',
      name: 'Housing',
      id: 26,
    },
    MCGO: {
      databaseName: 'MCGO',
      name: 'Cops and Crims',
      id: 21,
    },
    WOOL_GAMES: {
      modeNames: {
        wool_wars_two_four_tourney: '4v4 (Tournament)',
      },
      databaseName: 'WoolGames',
      name: 'Wool Wars',
      id: 68,
    },
    SURVIVAL_GAMES: {
      databaseName: 'HungerGames',
      name: 'Blitz Survival Games',
      id: 5,
    },
    BATTLEGROUND: {
      databaseName: 'Battleground',
      name: 'Warlords',
      id: 23,
    },
    MURDER_MYSTERY: {
      modeNames: {
        MURDER_DOUBLE_UP: 'Double Up',
        MURDER_INFECTION: 'Infection',
        MURDER_ASSASSINS: 'Assassins',
        MURDER_CLASSIC: 'Classic',
      },
      databaseName: 'MurderMystery',
      name: 'Murder Mystery',
      id: 59,
    },
    ARCADE: {
      modeNames: {
        PARTY: 'Party Games',
        ONEINTHEQUIVER: 'Bounty Hunters',
        SOCCER: 'Football',
        SIMON_SAYS: 'Hypixel Says',
        PVP_CTW: 'Capture the Wool',
        ENDER: 'Ender Spleef',
        STARWARS: 'Galaxy Wars',
        DRAGONWARS2: 'Dragon Wars',
        DAYONE: 'Blocking Dead',
        GRINCH_SIMULATOR_V2: 'Grinch Simulator',
        DRAW_THEIR_THING: 'Pixel Painters',
      },
      databaseName: 'Arcade',
      name: 'Arcade',
      id: 14,
    },
    ARENA: {
      legacy: true,
      databaseName: 'Arena',
      name: 'Arena Brawl',
      id: 17,
    },
    TNTGAMES: {
      modeNames: {
        TEAMS_NORMAL: 'Teams Mode',
        PVPRUN: 'PVP Run',
        TNTAG: 'TNT Tag',
        TNTRUN_TOURNEY: 'TNT Run Tourney',
        TNTRUN: 'TNT Run',
        BOWSPLEEF: 'Bow Spleef',
        CAPTURE: 'Wizards',
      },
      databaseName: 'TNTGames',
      name: 'The TNT Games',
      id: 6,
    },
    WALLS: {
      legacy: true,
      databaseName: 'Walls',
      name: 'Walls',
      id: 3,
    },
    SKYWARS: {
      modeNames: {
        solo_insane_lucky: 'Solo Lucky Block',
        solo_insane_slime: 'Solo Slime',
        teams_insane_slime: 'Teams Slime',
        teams_insane_rush: 'Teams Rush',
        teams_insane_lucky: 'Teams Lucky Block',
        solo_normal: 'Solo Normal',
        teams_insane: 'Teams Insane',
        solo_insane_hunters_vs_beasts: 'Solo Hunters vs Beasts',
        ranked_normal: 'Ranked',
        solo_insane_tnt_madness: 'Solo TNT Madness',
        mega_doubles: 'Mega Doubles',
        solo_insane_rush: 'Solo Rush',
        solo_insane: 'Solo Insane',
        teams_insane_tnt_madness: 'Teams TNT Madness',
        teams_normal: 'Teams Normal',
        mega_normal: 'Mega',
      },
      databaseName: 'SkyWars',
      name: 'SkyWars',
      id: 51,
    },
    VAMPIREZ: {
      legacy: true,
      databaseName: 'VampireZ',
      name: 'VampireZ',
      id: 7,
    },
    PROTOTYPE: {
      modeNames: {
        PIXEL_PARTY: 'Pixel Party',
        INVADERS: 'Invaders',
        TOWERWARS_SOLO: 'TowerWars - Solo',
        WOOL_WARS: 'Wool Wars',
        TOWERWARS_TEAM_OF_TWO: 'TowerWars - Teams of Two',
      },
      databaseName: 'Prototype',
      name: 'Prototype',
      id: 57,
    },
    WALLS3: {
      databaseName: 'Walls3',
      name: 'Mega Walls',
      id: 13,
    },
    BEDWARS: {
      modeNames: {
        BEDWARS_TWO_FOUR: '4v4',
        BEDWARS_EIGHT_ONE: 'Solo',
        BEDWARS_FOUR_FOUR_RUSH: 'Rush 4v4v4v4',
        BEDWARS_EIGHT_TWO_RUSH: 'Rush Doubles',
        BEDWARS_EIGHT_TWO_VOIDLESS: 'Voidless Doubles',
        BEDWARS_FOUR_FOUR_ARMED: 'Armed 4v4v4v4',
        BEDWARS_EIGHT_TWO_ARMED: 'Armed Doubles',
        BEDWARS_EIGHT_TWO_UNDERWORLD: 'Underworld Doubles',
        BEDWARS_EIGHT_TWO_SWAP: 'Swappage Doubles',
        BEDWARS_EIGHT_TWO: 'Doubles',
        BEDWARS_FOUR_FOUR: '4v4v4v4',
        BEDWARS_FOUR_FOUR_UNDERWORLD: 'Underworld 4v4v4v4',
        BEDWARS_EIGHT_ONE_RUSH: 'Rush Solo',
        BEDWARS_FOUR_FOUR_ULTIMATE: 'Ultimate 4v4v4v4',
        BEDWARS_EIGHT_TWO_LUCKY: 'Lucky Doubles',
        BEDWARS_FOUR_FOUR_SWAP: 'Swappage 4v4v4v4',
        BEDWARS_FOUR_THREE: '3v3v3v3',
        BEDWARS_FOUR_FOUR_VOIDLESS: 'Voidless 4v4v4v4',
        BEDWARS_FOUR_FOUR_LUCKY: 'Lucky 4v4v4v4',
        BEDWARS_CASTLE: 'Castle',
        BEDWARS_EIGHT_ONE_ULTIMATE: 'Ultimate Solo',
        BEDWARS_EIGHT_TWO_TOURNEY: 'Doubles (Tourney)',
        BEDWARS_EIGHT_TWO_ULTIMATE: 'Ultimate Doubles',
      },
      databaseName: 'Bedwars',
      name: 'Bed Wars',
      id: 58,
    },
    PAINTBALL: {
      legacy: true,
      databaseName: 'Paintball',
      name: 'Paintball',
      id: 4,
    },
    SUPER_SMASH: {
      databaseName: 'SuperSmash',
      name: 'Smash Heroes',
      id: 24,
    },
    SMP: {
      databaseName: 'SMP',
      name: 'SMP',
      id: 67,
    },
    REPLAY: {
      databaseName: 'Replay',
      name: 'Replay',
      id: 65,
    },
    TRUE_COMBAT: {
      databaseName: 'TrueCombat',
      name: 'Crazy Walls',
      retired: true,
      id: 52,
    },
    PIT: {
      databaseName: 'Pit',
      name: 'Pit',
      id: 64,
    },
    SPEED_UHC: {
      databaseName: 'SpeedUHC',
      name: 'Speed UHC',
      id: 54,
    },
    DUELS: {
      modeNames: {
        DUELS_BOWSPLEEF_DUEL: 'Bow Spleef Duel',
        DUELS_BOW_DUEL: 'Bow Duel',
        DUELS_MW_DUEL: 'MegaWalls Duel',
        DUELS_UHC_FOUR: 'UHC Teams',
        DUELS_UHC_MEETUP: 'UHC Deathmatch',
        DUELS_SW_DOUBLES: 'SkyWars Doubles',
        DUELS_UHC_DOUBLES: 'UHC Doubles',
        DUELS_SW_FOUR: 'SkyWars Teams',
        DUELS_BRIDGE_FOUR: 'The Bridge Teams',
        DUELS_SUMO_DUEL: 'Sumo Duel',
        DUELS_BRIDGE_THREES: 'Bridge 3v3',
        DUELS_OP_DUEL: 'OP Duel',
        DUELS_MW_DOUBLES: 'MegaWalls Doubles',
        DUELS_SUMO_TOURNAMENT: 'Sumo Championship',
        DUELS_DUEL_ARENA: 'Duel Arena',
        DUELS_COMBO_DUEL: 'Combo Duel',
        DUELS_BRIDGE_2V2V2V2: 'The Bridge 2v2v2v2',
        DUELS_BRIDGE_DOUBLES: 'The Bridge Doubles',
        DUELS_BRIDGE_TOURNAMENT: 'The Bridge Championship',
        DUELS_BOXING_DUEL: 'Boxing Duel',
        DUELS_UHC_DUEL: 'UHC Duel',
        DUELS_BRIDGE_3V3V3V3: 'The Bridge 3v3v3v3',
        DUELS_UHC_TOURNAMENT: 'UHC Championship',
        DUELS_OP_DOUBLES: 'OP Doubles',
        DUELS_PARKOUR_EIGHT: 'Parkour',
        DUELS_CAPTURE_THREES: 'Bridge CTF 3v3',
        DUELS_BLITZ_DUEL: 'Blitz Duel',
        DUELS_MW_FOUR: 'MegaWalls Teams',
        DUELS_CLASSIC_DUEL: 'Classic Duel',
        DUELS_POTION_DUEL: 'NoDebuff Duel',
        DUELS_BRIDGE_DUEL: 'The Bridge Duel',
        DUELS_SW_TOURNAMENT: 'SkyWars Championship',
        DUELS_SW_DUEL: 'SkyWars Duel',
      },
      databaseName: 'Duels',
      name: 'Duels',
      id: 61,
    },
    GINGERBREAD: {
      databaseName: 'GingerBread',
      name: 'Turbo Kart Racers',
      id: 25,
    },
  },
};
