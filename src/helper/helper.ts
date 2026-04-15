export function emptyOrRows(rows: any) {
    if (!rows) {
        return [];

    }
    return rows;
}

export function emptyOrRow(rows: any) {
    if (!rows) {
        return null;
    }
    return rows[0];
}