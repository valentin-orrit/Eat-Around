// config/ngrok.js
import ngrok from '@ngrok/ngrok'

export async function startNgrok(port, ngrokUrl) {
    try {
        if (!ngrokUrl) {
            console.log('No NGROK_URL provided, skipping tunnel setup')
            return null
        }

        const listener = await ngrok.forward({
            addr: port,
            authtoken_from_env: true,
            domain: ngrokUrl,
        })

        const url = listener.url()
        console.log(`Ingress established at: ${url}`)
        return url
    } catch (error) {
        if (error.errorCode === 'ERR_NGROK_108') {
            console.warn('Ngrok session limit reached.')
        } else {
            console.warn('Failed to establish ngrok tunnel:', error.message)
        }

        console.log('Server continuing without ngrok tunnel...')
        return null
    }
}
