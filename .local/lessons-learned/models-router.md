



## Shortlist of models

```json
{
  "Router": {
    "default": "openrouter,z-ai/glm-4.5",
    "background": "openrouter,deepseek/deepseek-chat-v3.1:free",
    "think": "openrouter,z-ai/glm-4.5",
    "longContext": "openrouter,x-ai/grok-code-fast-1",
    "longContextThreshold": 60000,
    "webSearch": "openrouter,google/gemini-2.5-flash"
  }
}
```

```yaml

- router
  default:
    name: "openrouter,z-ai/glm-4.5"
    output_price: $1.65
    total_context: 131K
  coding:
    name: "openrouter,x-ai/grok-code-fast-1"
    output_price: $1.5
    total_context: 256K
  background:
    name: "openrouter,deepseek/deepseek-chat-v3.1:free"
    output_price: $0
    total_context: 163
  think:
    name: "openrouter,z-ai/glm-4.5"
    output_price: $1.65
    total_context: 131K
  longContext:
    name: "openrouter,x-ai/grok-4-fast"
    output_price: $0.5
    total_context: 2000K
  webSearch:
    name: "openrouter,x-ai/grok-4-fast"
    output_price: $0.5
    total_context: 2M

```

## Web search

```yaml
webSearch:
  - name: "x-ai/grok-4-fast"
    output_price: $0.5
    total_context: 2000K
    browseCompRank: 4
    webArena: 5
    score: 22
    link: "https://openrouter.ai/x-ai/grok-4-fast"
  - name: "google/gemini-2.5-flash"
    output_price: $2.5
    total_context: 1048K
    browseCompRank: 6
    webArena: 3
    score: 4.4
    link: "https://openrouter.ai/google/gemini-2.5-flash"
  - name: "anthropic/claude-sonnet-4"
    output_price: $15
    total_context: 1000K
    browseCompRank: 2
    webArena: 1
    score: 1.133
    link: "https://openrouter.ai/anthropic/claude-sonnet-4"
```

## Grok Code / Fast

- Did poor job by not following instructions, missing important things
- Possibly I was doing something incorrectly or did not use Claude Code correctly
