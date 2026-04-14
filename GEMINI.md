# Slash Commands

Respond to the following slash commands by delegating to the corresponding specialized sub-agent:

| Command | Sub-Agent | Purpose |
| :--- | :--- | :--- |
| `/spec` | `spec` | Define what to build before writing code. |
| `/plan` | `plan` | Plan how to build a feature with atomic tasks. |
| `/build` | `build` | Implement the plan incrementally with tests. |
| `/test` | `test` | Prove the code works with automated tests. |
| `/review` | `review` | Review code health via a 5-axis review. |
| `/code-simplify` | `simplify` | Refactor code for readability and simplicity. |
| `/ship` | `ship` | Prepare for PR and production launch. |

## Execution Guidelines
1.  **Decompose:** When a slash command is used, prioritize delegating the task to the named sub-agent.
2.  **Context:** Provide relevant context (specs, plans, files) to the sub-agent.
3.  **Single-Flow:** Maintain the single-flow execution model. Only one sub-agent should be active at a time.
4.  **Verification:** Always verify the sub-agent's output before continuing.
