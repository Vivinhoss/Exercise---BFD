class Livro {
    constructor(
        public id: number,
        public titulo: string,
        public autor: string,
        public disponivel: boolean = true
    ) {}

    async emprestar(): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!this.disponivel) {
                    reject(new Error(`O livro ${this.titulo} já está emprestado.`));
                } else {
                    this.disponivel = false;
                    console.log(`Livro emprestado: ${this.titulo}`);
                    resolve();
                }
            }, 500);
        });
    }

    async devolver(): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.disponivel) {
                    reject(new Error(`O livro {this.titulo} já está disponivel`));
                } else {
                    this.disponivel = true;
                    console.log(`Livro devolvido: ${this.titulo}`);
                    resolve();
                }
            }, 500);
        });
    }
}

class Biblioteca {
    private livros: Livro[] = [];
    adicionarLivro(livro: Livro): void {
        this.livros.push(livro);
    }

    listarLivros(): void {
        console.log(`Livros disponiveis`);
        this.livros.forEach((livro) => {
            console.log(
                `[${livro.disponivel ? "Ok" : "Ah"}] ${livro.titulo} (${livro.autor})`
            );
        });
    }

    buscarLivroPorId(id: number): Livro | undefined { //Undefined - é o valor primitivo retornado quando uma variavel foi declarada, mas nenhum valor foi atribuido a ela.
        return this.livros.find((livro) => livro.id === id); //.find - é usado para encontrar o primeiro elemento em um array em u array que satisfaz uma condição especifica.
    }
}

async function main() {
    const biblioteca = new Biblioteca();

    //Livros adicionados
    biblioteca.adicionarLivro(new Livro(1, "O Cão de Baskerville", "Arthur Conan Doyle"));
    biblioteca.adicionarLivro(new Livro(2, "O Vale do Medo", "Arthur Conan Doyle"));
    biblioteca.adicionarLivro(new Livro(3, "A cor que caiu do espaço", "H.P. Lovecraft"));
    biblioteca.adicionarLivro(new Livro(4, "A música de Erich Zann", "H.P. Lovecraft"));
    biblioteca.adicionarLivro(new Livro(5, "O Gato Preto", "Edgar Allan Poe"));

    biblioteca.listarLivros();

    //Emprestar livro
    const livro1 = biblioteca.buscarLivroPorId(1);
    if (livro1) {
        try {
            await livro1.emprestar();
        } catch (erro: unknown) { //unknown - oferece uma alternativa mais segura ao tipo any.
            if (erro instanceof Error) console.error(erro.message); //instanceof - é uma proteção de tipo (type guard) usada para verificar se um objeto pertence a uma determinada class ou constructor.
        }
    }

    //Erro ao emprestar o livro
    if (livro1) {
        try {
            await livro1.emprestar();
        } catch (erro: unknown) {
            if (erro instanceof Error) console.error(erro.message);
        }
    }

    //Devolver livro
    if (livro1) {
        try {
            await livro1.devolver();
        } catch (erro: unknown) {
            if (erro instanceof Error) console.error(erro.message);
        }
    }
}

main();