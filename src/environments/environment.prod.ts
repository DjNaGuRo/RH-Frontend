const baseUrlApi = 'https://rhmanagement.herokuapp.com';
export const environment = {
  production: true,
  baseUrlApi,
  urlResourceCalendar: `${baseUrlApi}/calendar`,
  urlResourceCollaborator : `${baseUrlApi}/collaborator`,
  urlResourceAddDayOff : `${baseUrlApi}/post/dayoff`,
  urlResourceDeleteDayOff : `${baseUrlApi}/post/dayoff/remove`,
  apiUrl: 'https://rhmanagement.herokuapp.com/'
};
