# Tasks API - Exemplos de chamadas (cURL)

Base URL (exemplo local):

```
http://localhost:3000
```

Cabeçalhos comuns:

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

1) Listar tasks de um time

```bash
curl -s -H "Authorization: Bearer $TOKEN" \
  "${BASE_URL:-http://localhost:3000}/api/teams/$TEAM_UUID/tasks"
```

Resposta esperada: 200 OK com array de tasks (uuid, title, description, tag, priority, assigneeUUID, status, position, teamUUID)

2) Criar uma task

```bash
curl -s -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{
    "title": "Nova tarefa",
    "description": "Descrição da tarefa",
    "tag": "Frontend",
    "priority": "medium",
    "assigneeUUID": "user-uuid-or-null",
    "position": 0
  }' \
  "${BASE_URL:-http://localhost:3000}/api/teams/$TEAM_UUID/tasks"
```

Resposta esperada: 201 Created

3) Atualizar uma task (ex.: mover coluna/atualizar status ou assignee)

```bash
curl -s -X PUT -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{
    "status": "inprogress",
    "assigneeUUID": "new-user-uuid",
    "position": 2
  }' \
  "${BASE_URL:-http://localhost:3000}/api/tasks/$TASK_UUID"
```

Resposta esperada: 200 OK

4) Deletar uma task

```bash
curl -s -X DELETE -H "Authorization: Bearer $TOKEN" \
  "${BASE_URL:-http://localhost:3000}/api/tasks/$TASK_UUID"
```

Resposta esperada: 200 OK

5) Reordenar / atualizar várias tasks (enviar array com uuid/status/position)

```bash
curl -s -X PUT -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '[
    {"uuid":"task-uuid-1","status":"inprogress","position":0},
    {"uuid":"task-uuid-2","status":"todo","position":1}
  ]' \
  "${BASE_URL:-http://localhost:3000}/api/teams/$TEAM_UUID/tasks/reorder"
```

Resposta esperada: 200 OK

Observações:
- Substitua `$TOKEN`, `$TEAM_UUID` e `$TASK_UUID` pelas variáveis reais.
- O front-end deverá chamar o endpoint de `PUT /api/tasks/:uuid` sempre que um card mudar de coluna (status) ou for reatribuído.
