const assert = require("assert");
const controller = require("../../api/controllers/ProductsController");
const { mockAsync, RESPONSE, PRODUCT } = require("../sinonUtils");
const sinon = require("sinon");

describe("ProductsController", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Deve retornar todos os produtos", async () => {
    //ARRANGE
    const findStub = mockAsync(controller, "find", PRODUCT);

    //ACT
    const result = await controller.find();

    //ASSERT
    assert.strictEqual(findStub.calledOnce, true);
    assert.deepStrictEqual(result, PRODUCT);
  });

  it("Deve retornar um produto específico", async () => {
    //ARRANGE
    const productId = 120;
    const findOneStub = mockAsync(controller, "findOne", PRODUCT);

    //ACT
    const result = await controller.findOne({ param: sinon.stub().returns(productId) }, RESPONSE);

    //ASSERT
    assert.strictEqual(findOneStub.calledOnce, true);
    assert.deepStrictEqual(result, PRODUCT);
  });

  it("Deve criar um produto com sucesso", async () => {
    //ARRANGE
    const createStub = mockAsync(controller, "create", PRODUCT);
    const req = { body: PRODUCT };

    //ACT
    const result = await controller.create(req, RESPONSE);

    //ASSERT
    assert.strictEqual(createStub.calledOnce, true);
    assert.deepStrictEqual(result, PRODUCT);
  });

  it("Deve retornar erro ao tentar criar produto sem todos os campos", async () => {
    //ARRANGE
    const req = { body: { name: "Test Product" } }; // Faltando 'type' e 'model'
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    //ACT
    await controller.create(req, res);

    //ASSERT
    assert.strictEqual(res.status.calledOnceWith(400), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'Name, type, and model are required' });
  });

  it("Deve atualizar um produto com sucesso", async () => {
    //ARRANGE
    const productId = 120;
    const updatedProduct = { ...PRODUCT, name: "Updated Product" };
    const updateStub = mockAsync(controller, "update", updatedProduct);
    const req = { param: sinon.stub().returns(productId), body: updatedProduct };
    const res = { json: sinon.stub() };

    //ACT
    await controller.update(req, res);

    //ASSERT
    assert.strictEqual(updateStub.calledOnce, true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], updatedProduct);
  });

  it("Deve retornar erro ao tentar atualizar produto sem todos os campos", async () => {
    //ARRANGE
    const productId = 120;
    const req = { param: sinon.stub().returns(productId), body: { name: "Updated Product" } }; // Faltando 'type' e 'model'
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    //ACT
    await controller.update(req, res);

    //ASSERT
    assert.strictEqual(res.status.calledOnceWith(400), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'Name, type, and model are required' });
  });

  it("Deve deletar um produto com sucesso", async () => {
    //ARRANGE
    const productId = 120;
    const deletedProduct = PRODUCT;
    const destroyStub = mockAsync(controller, "destroy", deletedProduct);
    const req = { param: sinon.stub().returns(productId) };
    const res = { json: sinon.stub() };

    //ACT
    await controller.destroy(req, res);

    //ASSERT
    assert.strictEqual(destroyStub.calledOnce, true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], deletedProduct);
  });

  it("Deve retornar erro ao tentar deletar produto inexistente", async () => {
    //ARRANGE
    const productId = 999;
    const req = { param: sinon.stub().returns(productId) };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    //ACT
    await controller.destroy(req, res);

    //ASSERT
    assert.strictEqual(res.status.calledOnceWith(404), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'Product not found' });
  });

  it("Deve retornar erro ao tentar buscar produto sem ID", async () => {
    //ARRANGE
    const req = { param: sinon.stub().returns(null) };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    //ACT
    await controller.findOne(req, res);

    //ASSERT
    assert.strictEqual(res.status.calledOnceWith(400), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'Product ID is required' });
  });

  it("Deve retornar erro ao tentar buscar produto inexistente", async () => {
    //ARRANGE
    const productId = 999;
    const req = { param: sinon.stub().returns(productId) };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    //ACT
    await controller.findOne(req, res);

    //ASSERT
    assert.strictEqual(res.status.calledOnceWith(404), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'Product not found' });
  });
});
