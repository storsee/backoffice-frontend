export function actionKey(action: string, id?: string | number | null): string {
  return id != null && id !== '' ? `${action}:${id}` : action;
}

export function isActionLoading(state: string | number | null, action: string, id?: string | number | null): boolean {
  return state === actionKey(action, id);
}
