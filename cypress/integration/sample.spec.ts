describe('主页测试', () => {
    it('按钮点击后文本是否改变', () => {
        cy.visit('http://localhost:4000');
        cy.get('button').click();
        cy.get('h1').should('have.text', 'Changed!');
    });
});
