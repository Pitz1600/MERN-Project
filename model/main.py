from src.controller.grammar_checker import checker

def main():

    while True:
        get_input = input("Sentence(CTRL+C to exit): ")
        test = checker(get_input)
        print(test)

if __name__ == "__main__":
    main()