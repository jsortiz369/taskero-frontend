export const capitalizeFirstLetter = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
export const capitalizeAllWords = (string: string): string => string.split(' ').map(capitalizeFirstLetter).join(' ');
