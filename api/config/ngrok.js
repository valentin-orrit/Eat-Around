import ngrok from '@ngrok/ngrok'

export async function startNgrok(port, ngrokUrl) {
    const listener = await ngrok.forward({
        addr: port,
        authtoken_from_env: true,
        domain: ngrokUrl,
    })
    console.log(`Ingress established at: ${listener.url()}`)
    return listener.url()
}
