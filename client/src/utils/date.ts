export function formatToDMY(dateString: number): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

export function ISOToMMDDYY(ISOString: string, includeY?: boolean){
    const date = new Date(ISOString);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    if (includeY) {
        const year = date.getFullYear();
        return `${mm}/${dd}/${year}`;
    }
    return `${mm}/${dd}`;
}

export function distanceToDeadline(deadlineISOString: string){
    const today = new Date();
    return new Date(deadlineISOString).getTime() - today.getTime(); 
}

export function toLocalMidnight(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0, -1);
}

export function daysSince(ISOString: string){
    const MILISECONDS_IN_A_DAY = (1000 * 60 * 60 * 24);
    const today = new Date();
    const millisecondsSince = today.getTime() - new Date(ISOString).getTime();
    return millisecondsSince / MILISECONDS_IN_A_DAY;
}