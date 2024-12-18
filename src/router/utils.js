export function isAuthenticated() {
    return !!localStorage.getItem('user'); // Remplace par ta logique d'authentification
}