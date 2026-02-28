# 📝 Task Manager API

Backend da **Plataforma de Gestão de Tarefas (To-Do App Avançado)**.

Este projeto tem como objetivo fornecer uma API robusta para gerenciamento de tarefas pessoais e colaborativas, focada em produtividade, organização e escalabilidade. A aplicação foi pensada para evoluir como um produto SaaS, permitindo integração com outros serviços e crescimento modular.

A API será responsável por toda a lógica de negócio, incluindo autenticação de usuários, gerenciamento de tarefas, organização por listas e tags, colaboração entre usuários e integrações externas.

---

## 🎯 Objetivo do Projeto

Criar um backend escalável e bem estruturado para uma plataforma de tarefas que permita:

- Organização eficiente de tarefas
- Colaboração entre usuários
- Acompanhamento de produtividade
- Integrações com serviços externos
- Evolução contínua de funcionalidades

---

## 🚀 Principais Funcionalidades (em desenvolvimento)

- Cadastro e autenticação de usuários
- Criação, edição e exclusão de tarefas
- Organização por listas, tags e prioridades
- Definição de prazos e tarefas recorrentes
- Compartilhamento de listas
- Comentários e anexos em tarefas
- Integração com Google Calendar
- Estatísticas de produtividade

---

## 🛠️ Tecnologias

🧑‍💻 Node.js, Express.js, TypeScript, Postgres

---

## 📂 Arquitetura

```
src/
 ├── domain/                # Núcleo da aplicação (independente de frameworks)
 │    ├── entities/         # Entidades de negócio (Task, User, List, Tag)
 │    ├── value_objects/    # Objetos de valor (Email, Priority, Deadline)
 │    ├── repositories/     # Interfaces de repositórios (contratos)
 │    └── services/         # Regras de negócio puras (ex.: validações)
 │
 ├── application/           # Casos de uso (orquestram regras de negócio)
 │    ├── use_cases/        # Ex.: CreateTask, ShareList, AddComment
 │    └── dto/              # Data Transfer Objects (entrada/saída dos casos de uso)
 │
 ├── infrastructure/        # Implementações técnicas
 │    ├── persistence/      # Repositórios concretos (ORM, SQL, NoSQL)
 │    ├── external/         # Integrações (Google Calendar, Email, Storage)
 │    └── config/           # Configurações (DB, autenticação, env)
 │
 ├── interfaces/            # Adaptadores de entrada/saída
 │    ├── controllers/      # REST/GraphQL controllers
 │    ├── routes/           # Definição de endpoints
 │    └── presenters/       # Transformação de dados para resposta (DTO → JSON)
 │
 └── shared/                # Utilitários comuns
      ├── exceptions/       # Erros customizados
      ├── utils/            # Helpers
      └── middleware/       # Autenticação, logging, etc.

```

---

## 📌 Status

🚧 Projeto em desenvolvimento

---

## 👨‍💻 Autor

**Wallysson Oliveira**
