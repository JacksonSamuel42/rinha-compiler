# Rinha de compiladores - Interpretador

[Repositório da rinha](https://github.com/aripiprazole/rinha-de-compiler)

Este é um interpretador que recebe uma AST conforme especificação do [rinha](https://github.com/aripiprazole/rinha-de-compiler) e interpreta as instruções.

desenvolvido com typescript usando node 20.

## Execução para o rinha

Clone o repositório

```bash
https://github.com/JacksonSamuel42/rinha-compiler.git
```

Execute o docker

```bash
docker build -t rinha .
docker run rinha
```

## Execução do interpretador via cli

1. Use o nodejs 16.14 ou superior (recomendo o nodejs 20).
2. `npm install`
3. Faça o build do interpretador `npm run build`
4. adiciona o json a ser lido em var/rinha nomeie ele como source.rinha.json
5. `npm start`
