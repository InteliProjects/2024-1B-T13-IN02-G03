const { HANDBOOK, RESPONSE, mockAsync} = require("../sinonUtils");
const handbooksController = require("../../api/controllers/HandbooksController");
const assert = require("assert");
const sinon = require("sinon");

describe("HandbooksController", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Deve retornar todos os manuais", async () => {
    //ARRANGE
    const findStub = mockAsync(handbooksController, "find", HANDBOOK);

    //ACT
    const result = await handbooksController.find();

    //ASSERT
    assert.strictEqual(findStub.calledOnce, true);
    assert.deepStrictEqual(result, HANDBOOK);
  });

  it("Deve retornar um manual específico", async () => {
    // Arrange
    const handbookId = 120;
    const findOneStub = mockAsync(handbooksController, "findOne", HANDBOOK);
    // Act
    const result = await handbooksController.findOne({ params: { id: handbookId } }, RESPONSE);
    // Assert
    assert.strictEqual(findOneStub.calledOnce, true);
    assert.deepStrictEqual(result, HANDBOOK);
  });

  it("Deve criar um manual com sucesso", async () => {
    // Arrange
    const createStub = mockAsync(handbooksController, "create", HANDBOOK);
    const req = {
      body: HANDBOOK
    };
    // Act
    const result = await handbooksController.create(req, RESPONSE);
    // Assert
    assert.strictEqual(createStub.calledOnce, true);
    assert.deepStrictEqual(result, req.body);
  });

  it("Deve retornar erro ao tentar obter handbooks", async () => {
    const errorMessage = "Internal Server Error";
    const findStub = sinon.stub(Handbook, "find").rejects(new Error(errorMessage));
    const req = {};
    const res = { serverError: sinon.stub(), json: sinon.stub() };

    await handbooksController.find(req, res);

    assert.strictEqual(findStub.calledOnce, true);
    assert.strictEqual(res.serverError.calledOnce, true);
    assert.strictEqual(res.serverError.firstCall.args[0].message, errorMessage);
  });

 
  it("Deve retornar erro ao tentar criar um handbook sem todos os campos", async () => {
    const req = { body: { name: 'Teste' } }; // Faltando 'id_users'
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await handbooksController.create(req, res);

    assert.strictEqual(res.status.calledOnceWith(400), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'assembly_line and id_users are required' });
  });

  it("Deve retornar um handbook com sucesso", async () => {
    const handbookId = 1;
    const handbookData = HANDBOOK;
    const findOneStub = sinon.stub(Handbook, "findOne").resolves(handbookData);
    const req = { param: sinon.stub().returns(handbookId) };
    const res = { json: sinon.stub() };

    await handbooksController.findOne(req, res);

    assert.strictEqual(findOneStub.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], handbookData);
  });

  it("Deve retornar erro ao tentar obter um handbook inexistente", async () => {
    const handbookId = 1;
    const findOneStub = sinon.stub(Handbook, "findOne").resolves(null);
    const req = { param: sinon.stub().returns(handbookId) };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await handbooksController.findOne(req, res);

    assert.strictEqual(findOneStub.calledOnce, true);
    assert.strictEqual(res.status.calledOnceWith(404), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'Handbook not found' });
  });

  it("Deve atualizar uma lista de handbooks com sucesso", async () => {
    const handbookId = 205
    req.body = {
        title: "Latitude 5440000",
        description: "Este é um manual de montagem para o Latitude 3440000",

    }

    findStub = mockAsync(handbooksController, "update", HANDBOOK)

    const result = await handbooksController.update(req.body, RESPONSE);

    assert.strictEqual(findStub.calledOnce, true);
    assert.deepStrictEqual(result, HANDBOOK);
  });

  it("Deve retornar erro ao tentar atualizar um handbook inexistente", async () => {
    const handbookId = 1111111;
    const updatedData = { name: 'OI', id_materials: 1 };
    const updateStub = sinon.stub(Handbook, "updateOne").resolves(null);
    const req = { param: sinon.stub().returns(handbookId), body: updatedData };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await handbooksController.update(req, res);

    assert.strictEqual(updateStub.calledOnce, true);
    assert.strictEqual(res.status.calledOnceWith(404), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'Handbook not found' });
  });

  it("Deve destruir um handbook com sucesso", async () => {
    const handbookId = 205;
    const destroyStub = sinon.stub(Handbook, "destroyOne").resolves(HANDBOOK);
    const req = { param: sinon.stub().returns(handbookId) };
    const res = { json: sinon.stub() };

    await handbooksController.destroy(req, res);

    assert.strictEqual(destroyStub.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { message: 'Handbook deleted successfully' });
  });

  it("Deve retornar erro ao tentar destruir um handbook inexistente", async () => {
    const handbookId = 11111111;
    const destroyStub = sinon.stub(Handbook, "destroyOne").resolves(null);
    const req = { param: sinon.stub().returns(handbookId) };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await handbooksController.destroy(req, res);

    assert.strictEqual(destroyStub.calledOnce, true);
    assert.strictEqual(res.status.calledOnceWith(404), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'Handbook not found' });
  });
})
