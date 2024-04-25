require('dotenv').config()
const axios = require('axios')
const fs = require('fs')

fs.readFile(process.env.FILENAME, 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
        const data = JSON.parse(jsonString)
        const days = data.days
        let newHeartbeats = []

        for (let day of days) {
            const heartbeats = day.heartbeats
            for (let heartbeat of heartbeats) {
                newHeartbeats.push({
                    branch: heartbeat.branch,
                    category: heartbeat.category,
                    created_at: new Date(heartbeat.created_at).getTime() / 1000,
                    entity: heartbeat.entity,
                    is_write: heartbeat.is_write,
                    language: heartbeat.language,
                    project: heartbeat.project,
                    time: heartbeat.time,
                    type: heartbeat.type,
                    user_agent: heartbeat.user_agent_id
                })
            }
        }
        const chunkSize = 1000
        const chunks = Math.ceil(newHeartbeats.length / chunkSize)

        for (let i = 0 ; i < chunks ; i++) {
            const start = i * chunkSize
            const end = start + chunkSize
            const chunk = newHeartbeats.slice(start, end)

            setTimeout(() => {
                axios({
                    method: 'post',
                    url: process.env.API_URL,
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from(process.env.API_AUTH_TOKEN).toString('base64')
                    },
                    data: chunk
                })
                .then(response => {
                    console.log(`Successfully imported heartbeats: ${start} to ${end}`)
                })
                .catch(error => {
                    console.error(`Error importing heartbeats: ${start} to ${end}`)
                    console.error(error)
                })
            }, 500 * i)
        }
    } catch(err) {
        console.log('Error parsing JSON string:', err)
    }
})
