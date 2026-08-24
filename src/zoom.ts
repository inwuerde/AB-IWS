export type ZoomState = {
  available: boolean
  inZoom: boolean
  runningContext?: string
  error?: string
}

type ZoomSdk = {
  config: (opts: Record<string, unknown>) => Promise<{ runningContext?: string }>
  expandApp?: () => Promise<unknown>
  shareApp?: (opts?: Record<string, unknown>) => Promise<unknown>
  openUrl?: (opts: { url: string }) => Promise<unknown>
}

declare global {
  interface Window {
    zoomSdk?: ZoomSdk
  }
}

export async function initZoom(): Promise<ZoomState> {
  const sdk = window.zoomSdk
  if (!sdk) {
    return { available: false, inZoom: false }
  }
  try {
    const config = await sdk.config({
      version: '0.16',
      capabilities: [
        'getRunningContext',
        'getUserContext',
        'openUrl',
        'shareApp',
        'expandApp',
      ],
      popoutSize: { width: 720, height: 800 },
    })
    const ctx = config.runningContext ?? 'unknown'
    const inZoom = ctx !== 'inBrowser' && ctx !== 'unknown'
    return { available: true, inZoom, runningContext: ctx }
  } catch (err) {
    return {
      available: true,
      inZoom: false,
      error: err instanceof Error ? err.message : String(err),
    }
  }
}

export async function expandInZoom(): Promise<void> {
  await window.zoomSdk?.expandApp?.()
}

export async function shareInZoom(): Promise<void> {
  await window.zoomSdk?.shareApp?.()
}
