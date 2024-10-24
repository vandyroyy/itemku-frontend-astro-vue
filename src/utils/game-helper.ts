import type { IGameInfo } from "@/types/game";
import { convertToSlug } from "@/utils/common-helper";

export const gameInfoHelper = (data: any, options?: {hideSharingAccount: boolean}): IGameInfo => {
  const gameInfo = data as IGameInfo;
  gameInfo.game.game_slug = gameInfo.game.game_slug || convertToSlug(gameInfo.game.game_name);
  for (const itemType of gameInfo.item_type) {
    itemType.slug = convertToSlug(itemType.name);
    for (const itemGroup of itemType.item_info_group) {
      itemGroup.slug = convertToSlug(itemGroup.name);
    }
  }
  if (getDefault(options?.hideSharingAccount, true)) {
    gameInfo.item_type = gameInfo.item_type.filter((value) => value.is_sharing_account_eligible == false);
  }
  return gameInfo;
};

export const getDefault = <T>(input: any, def: T): T => {
  return isset(input) ? input : def;
};

const isset = (input: any): boolean => {
  return input !== undefined && input !== null;
};