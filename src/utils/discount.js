export function applyDiscount(originalPrice, discount) {
    return (100 - discount) * originalPrice / 100;
}
