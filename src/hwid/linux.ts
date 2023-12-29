import { exec } from './exec'
import type { ResolverFn } from './resolve'

export const linuxHWID: ResolverFn = async () => {
    const { stdout } = await exec(
        'cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || true',
    )

    const array = stdout.trim().split('\n')
    const first = array[0]
    if (!first) throw new Error('failed to find hwid')

    return first
}