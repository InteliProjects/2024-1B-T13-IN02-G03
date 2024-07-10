const assert = require("assert");
const controller = require("../../api/controllers/MaterialsController");
const { mockAsync, RESPONSE,  MATERIAL } = require("../sinonUtils");
const sinon = require("sinon");

describe("MaterialsController", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Deve retornar um produto específico", async () => {
    //ARRANGE
    const materialId = 120;
    const findOneStub = mockAsync(controller, "findOne", MATERIAL);

    //ACT
    const result = await controller.findOne({ param: sinon.stub().returns(materialId) }, RESPONSE);

    //ASSERT
    assert.strictEqual(findOneStub.calledOnce, true);
    assert.deepStrictEqual(result, MATERIAL);
  });

  it("Deve criar um produto com sucesso", async () => {
    //ARRANGE
    const createStub = mockAsync(controller, "create", MATERIAL);
    const req = { body: MATERIAL };

    //ACT
    const result = await controller.create(req, RESPONSE);

    //ASSERT
    assert.strictEqual(createStub.calledOnce, true);
    assert.deepStrictEqual(result, MATERIAL);
  });

  it("Deve retornar erro ao tentar criar produto sem todos os campos", async () => {
    //ARRANGE
    const req = { body: { file: "Test Product" } }; // Faltando 'type' e 'title'
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    //ACT
    await controller.create(req, res);

    //ASSERT
    assert.strictEqual(res.status.calledOnceWith(400), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'File, type, and title are required' });
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
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'Material ID is required' });
});


  it("Deve retornar erro ao tentar buscar produto inexistente", async () => {
    //ARRANGE
    const materialId = 999;
    const req = { param: sinon.stub().returns(materialId) };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    //ACT
    await controller.findOne(req, res);

    //ASSERT
    assert.strictEqual(res.status.calledOnceWith(404), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'Material not found' });
  });
});
