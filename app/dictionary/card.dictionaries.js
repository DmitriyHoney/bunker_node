const CARD_TYPES = {
    disaster: 'disaster',
    bunker: 'bunker',
    luggage: 'luggage', // Багаж
    health: 'health',
    biology: 'biology',
    hobby: 'hobby',
    quality: 'quality', // Человеческие качества
    phobia: 'phobia',
    additional : 'additional', // Дополнительная информация
    profession: 'profession',
};

const CARD_SPECIAL_TYPES = {
    change_vote_balance: 'change_vote_balance', // меняет баланс при голосовании
    change_card: 'change_card', // заменяет у кого-либо карту
    copy_card: 'copy_card', // копирует необходимую карту и обновляет существующую
    change_access_opened_card_in_round: 'change_access_opened_card_in_round', // меняет тип открываемой карты в раунде
    mixed_opened_card_players_by_type: 'mixed_opened_card_players_by_type',
    take_one_card: 'take_one_card', // взять ещё одну карту
    repeat_last_special_card: 'repeat_last_special_card', // повтори действие последней сыгранной карты (особых условий)
};

const SPECIAL_CARD_TIME_OF_ACTIONS = {
    one_round: 'one_round', // действует только на один раунд, в котором активирована
    all_time: 'all_time', // действует на протяжении всего времени игры
};

module.exports = {
    CARD_TYPES,
    CARD_SPECIAL_TYPES,
    SPECIAL_CARD_TIME_OF_ACTIONS,
}