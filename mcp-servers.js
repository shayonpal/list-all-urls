const mcpServers = [
    {
        name: "Todoist",
        description: "Task & project management via Todoist REST API",
        transport: "http",
        host: "Vercel",
        url: "https://todoist.uberfolks.ca/mcp",
        tools: [
            "todoist_tasks",
            "todoist_projects",
            "todoist_sections",
            "todoist_comments",
            "todoist_filters",
            "todoist_reminders",
            "todoist_labels",
            "todoist_bulk_tasks"
        ],
        config: {
            url: "https://todoist.uberfolks.ca/mcp"
        }
    },
    {
        name: "LifeOS",
        description: "Obsidian vault management - notes, search, daily journals",
        transport: "stdio",
        host: "Mac Mini",
        url: null,
        tools: [
            "search",
            "create_note",
            "list",
            "read_note",
            "edit_note",
            "get_daily_note",
            "insert_content",
            "get_yaml_rules",
            "list_templates",
            "list_folders",
            "list_daily_notes",
            "diagnose_vault",
            "get_server_version"
        ],
        config: {
            command: "node",
            args: ["/Users/shayon/DevProjects/mcp-for-lifeos/dist/src/index.js"]
        }
    },
    {
        name: "GSuite",
        description: "Gmail, Calendar & Contacts via GAM CLI",
        transport: "http",
        host: "Hetzner",
        url: "https://gsuite.shayonpal.com/mcp",
        tools: [
            "gsuite_gmail_search_messages",
            "gsuite_gmail_get_message",
            "gsuite_gmail_get_detailed_headers",
            "gsuite_gmail_send_message",
            "gsuite_gmail_modify_message",
            "gsuite_gmail_list_labels",
            "gsuite_gmail_create_label",
            "gsuite_gmail_update_label",
            "gsuite_gmail_delete_label",
            "gsuite_calendar_list_calendars",
            "gsuite_calendar_search_events",
            "gsuite_calendar_get_event",
            "gsuite_calendar_create_event",
            "gsuite_calendar_update_event",
            "gsuite_calendar_delete_event",
            "gsuite_calendar_update_attendees",
            "gsuite_contacts_search"
        ],
        config: {
            url: "https://gsuite.shayonpal.com/mcp"
        }
    },
    {
        name: "n8n",
        description: "Workflow automation - search and execute n8n workflows",
        transport: "http",
        host: "Pi5",
        url: "https://n8n.uberfolks.ca/mcp-server/http",
        tools: [
            "search_workflows",
            "get_workflow_details",
            "execute_workflow"
        ],
        config: {
            type: "streamableHttp",
            url: "https://n8n.uberfolks.ca/mcp-server/http",
            headers: {
                authorization: "Bearer <your-n8n-api-token>"
            }
        }
    }
];

export default mcpServers;
