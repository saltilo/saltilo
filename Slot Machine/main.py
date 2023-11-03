import random
import time
import sys

MAX_LINES = 3
MAX_BET = 100
MIN_BET = 10

ROWS = 3
COLS = 3

symbols_count = {
    "🍒": 4,
    "🍀": 6,
    "🍓": 6,
    "🍋": 2,
    "💙": 4,
    "🍇": 6,
    "7️⃣ ": 5,
    "🔔": 3,
    "💎": 5,

}

symbols_values = {
    "🍒": 6,
    "🍀": 3,
    "🍓": 2,
    "🍋": 4,
    "💙": 2,
    "🍇": 4,
    "7️⃣ ": 6,
    "🔔": 4,
    "💎": 3,
}


def check_win(columns, lines, bet, values):
    winnings = 0
    winnings_lines = []
    for line in range(lines):
        symbol = columns[0][line]
        for column in columns:
            symbol_to_check = column[line]
            if symbol != symbol_to_check:
                break
        else:
            winnings += values[symbol] * bet
            winnings_lines.append(line + 1)
    return winnings, winnings_lines


def get_spin(rows, cols, symbols):
    all_symbols = []
    for symbol, symbol_count in symbols.items():
        for _ in range(symbol_count):
            all_symbols.append(symbol)

    columns = []
    for _ in range(cols):
        column = []
        current_symbols = all_symbols[:]
        for _ in range(rows):
            value = random.choice(current_symbols)
            current_symbols.remove(value)
            column.append(value)

        columns.append(column)

    return columns


def print_spin(columns):
    for row in range(len(columns[0])):
        for i, column in enumerate(columns):
            if i != 0:
                print(" | ", end="")
            print(column[row], end="")
        print()


def deposit():
    while True:
        amount = input("Сколько ֏ ты хочешь внести на депозит?\n")
        if amount.isdigit():
            amount = int(amount)
            if amount > 0:
                break
            else:
                print("Депозит должен быть больше нуля")
        else:
            print("Введи число")
    return amount


def get_number_of_lines():
    while True:
        lines = input(
            "Укажи число линий, на которое хочешь сделать ставку (1-" + str(MAX_LINES) + ")\n")
        if lines.isdigit():
            lines = int(lines)
            if 1 <= lines <= MAX_LINES:
                break
            else:
                print("Введи корректное число линий\n")
        else:
            print("Введи число\n")
    return lines


def get_bet():
    while True:
        bet = input("Сколько ֏ ты хочешь поставить на каждую линию?\n")
        if bet.isdigit():
            bet = int(bet)
            if MIN_BET <= bet <= MAX_BET:
                break
            else:
                print(
                    f"Твоя ставка должна быть в пределах от {MIN_BET} до {MAX_BET}֏\n")
        else:
            print("Введи число\n")
    return bet


def spin_round(balance):
    lines = get_number_of_lines()
    while True:
        bet = get_bet()
        total_bet = lines * bet

        if total_bet > balance:
            print(
                f"У тебя недостаточно денег на депозите. Твой текущий баланс {balance}֏.")
            answer = input(
                "Нажми q, чтобы закончить игру. Нажми Enter, чтобы ввести новую ставку\n")
            if answer == "q":
                print(f"Ты уходишь из казино. Твой баланс {balance} ֏")
                sys.exit()
        else:
            break

    print(
        f"Итак, ты ставишь {bet}֏ на {lines} линий. Общая ставка {total_bet}֏.")
    time.sleep(1)
    print("Круууутим! 🎰")
    time.sleep(1)
    print()

    slots = get_spin(ROWS, COLS, symbols_count)
    print_spin(slots)
    winnings, winnings_lines = check_win(slots, lines, bet, symbols_values)

    if winnings == 0:
        print("Наверняка, повезет в другой раз 😉")
    else:
        print(f"Твой выигрыш {winnings}֏")
        print(f"Выигрыш произошел на линии:", *winnings_lines)

    return balance + winnings - total_bet


def main():
    balance = deposit()
    while True:
        print(f"Твой текущий баланс {balance}֏")
        answer = input(
            "Нажми Enter, чтобы сыграть. Чтобы выйти из игры, нажми q \n")
        if answer == "":
            balance = spin_round(balance)
        elif answer == "q":
            break
    print(f"Ты уходишь из казино, твой баланс {balance} ֏")


if __name__ == "__main__":
    main()
