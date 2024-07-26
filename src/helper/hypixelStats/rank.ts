const colorToCode = {
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
};

function getPlayerRank(rank?: string | null, packageRank?: string | null, newPackageRank?: string | null, monthlyPackageRank?: string | null) {
  let playerRank = rank === 'NORMAL' ? newPackageRank || packageRank || null : rank || newPackageRank || packageRank || null;
  if (playerRank === 'MVP_PLUS' && monthlyPackageRank === 'SUPERSTAR') {
    playerRank = 'MVP_PLUS_PLUS';
  }
  if (rank === 'NONE') playerRank = null;
  return playerRank;
}

function generateFormattedRank(rank: string | null, plusColor: string, plusPlusColor: string, prefix: string | null): string {
  if (prefix) return prefix;

  const ranks = {
    VIP: '§a[VIP]',
    VIP_PLUS: '§a[VIP§6+§a]',
    MVP: '§b[MVP]',
    MVP_PLUS: `§b[MVP${plusColor}+§b]`,
    MVP_PLUS_PLUS: `${plusPlusColor}[MVP${plusColor}++${plusPlusColor}]`,
    HELPER: '§9[HELPER]',
    MODERATOR: '§2[MOD]',
    GAME_MASTER: '§2[GM]',
    ADMIN: '§c[ADMIN]',
    YOUTUBER: '§c[§fYOUTUBE§c]',
  };

  return ranks[rank as keyof typeof ranks] || '§7';
}

export const getRank = function getRank(player: any): string {
  const rank = getPlayerRank(player.rank, player.packageRank, player.newPackageRank, player.monthlyPackageRank);
  const plusColor = `§${colorToCode[(player.rankPlusColor as keyof typeof colorToCode) || 'RED']}`;
  const plusPlusColor = `§${colorToCode[(player.monthlyRankColor as keyof typeof colorToCode) || 'GOLD']}`;
  const prefix = player.prefix ? player.prefix.replace(/Â§/g, '§').replace(/§/g, '&') : null;

  return generateFormattedRank(rank, plusColor, plusPlusColor, prefix);
};
