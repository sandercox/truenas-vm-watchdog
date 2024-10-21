# TrueNAS Scale VM Watchdog

While you can set a TrueNas VM to auto run if it crashes there is no button to auto restart it

This simple container creates a docker environment that checks every minute if VMs are still running
starting if they have accidentally stopped running.

# Environment settings

| Key | Value |
| === | === |
| API_KEY | TrueNAS Bearer token API Key |
| API_URL | `http(s)://<truenas_host_or_ip>/api/v2.0` |
| NODE_TLS_REJECT_UNAUTHORIZED | `0` if you want to access over https with self-signed certificates |P