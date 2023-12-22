export default function isServer() {
    return process.server || typeof window === 'undefined';
}
