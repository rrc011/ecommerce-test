import { OnlineShopTemplatePage } from './app.po';

describe('OnlineShop App', function() {
  let page: OnlineShopTemplatePage;

  beforeEach(() => {
    page = new OnlineShopTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
