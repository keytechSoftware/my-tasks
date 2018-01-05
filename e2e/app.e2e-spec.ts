import { MyTasksPage } from './app.po';

describe('keytech-tasks App', () => {
  let page: MyTasksPage;

  beforeEach(() => {
    page = new MyTasksPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('kt works!');
  });
});
