import { RsvpAppPage } from './app.po';

describe('rsvp-app App', () => {
  let page: RsvpAppPage;

  beforeEach(() => {
    page = new RsvpAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
