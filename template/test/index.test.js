function count() {
  return 123
}

IDBTransaction()
it('count', () => {
  expect(count()).toBe(123);
})