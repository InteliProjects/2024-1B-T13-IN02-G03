const assert = require("assert");
const controller = require("../../api/controllers/UsersController");
const { mockAsync, RESPONSE, USER } = require("../sinonUtils");
const sinon = require("sinon");

describe("UsersController", () => {
  afterEach(() => {
    // Restore the original methods after each test
    sinon.restore();
  });

  it("Deve retornar todos os usuários", async () => {
    //ARRANGE
    const findStub = mockAsync(controller, "find", USER);

    //ACT
    const result = await controller.find();

    //ASSERT
    assert.strictEqual(findStub.calledOnce, true);
    assert.deepStrictEqual(result, USER);
  });

  it("Deve retornar um usuário específico", async () => {
    //ARRANGE
    const userId = 120;
    const findOneStub = mockAsync(controller, "findOne", USER);

    //ACT
    const result = await controller.findOne({ params: { id: userId } }, RESPONSE);

    //ASSERT
    assert.strictEqual(findOneStub.calledOnce, true);
    assert.deepStrictEqual(result, USER);
  });

  it("Deve criar um usuário com sucesso", async () => {
    //ARRANGE
    const createStub = mockAsync(controller, "create", USER);
    const req = {
      body: USER
    };
    //ACT
    const result = await controller.create(req, RESPONSE);

    //ASSERT
    assert.strictEqual(createStub.calledOnce, true);
    assert.deepStrictEqual(result, req.body);
  });
  it("Deve retornar erro ao tentar criar usuário com dados incompletos", async () => {
    //ARRANGE
    const req = { body: { name: "Test User" } }; // Faltando campos obrigatórios
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    //ACT
    await controller.create(req, res);

    //ASSERT
    assert.strictEqual(res.status.calledOnceWith(400), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'Email and password are required' });
  });

  it("Deve atualizar um usuário com sucesso", async () => {
    //ARRANGE
    const userId = 120;
    const updatedUser = { ...USER, name: "Updated User" };
    const updateStub = mockAsync(controller, "update", updatedUser);
    const req = { params: { id: userId }, body: updatedUser };
    const res = { json: sinon.stub() };

    //ACT
    await controller.update(req, res);

    //ASSERT
    assert.strictEqual(updateStub.calledOnce, true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], updatedUser);
  });

  it("Deve retornar erro ao tentar atualizar usuário inexistente", async () => {
    //ARRANGE
    const userId = 999;
    const req = { params: { id: userId }, body: { name: "Updated User" } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    //ACT
    await controller.update(req, res);

    //ASSERT
    assert.strictEqual(res.status.calledOnceWith(404), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'User not found' });
  });

  it("Deve deletar um usuário com sucesso", async () => {
    //ARRANGE
    const userId = 120;
    const deletedUser = USER;
    const destroyStub = mockAsync(controller, "destroy", deletedUser);
    const req = { params: { id: userId } };
    const res = { json: sinon.stub() };

    //ACT
    await controller.destroy(req, res);

    //ASSERT
    assert.strictEqual(destroyStub.calledOnce, true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { message: 'User deleted successfully' });
  });

  it("Deve retornar erro ao tentar deletar usuário inexistente", async () => {
    //ARRANGE
    const userId = 999;
    const req = { params: { id: userId } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    //ACT
    await controller.destroy(req, res);

    //ASSERT
    assert.strictEqual(res.status.calledOnceWith(404), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'User not found' });
  });

  it("Deve autenticar um usuário com sucesso", async () => {
    //ARRANGE
    const loginStub = mockAsync(controller, "login", USER);
    const req = { body: { email: USER.email, password: USER.password } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    //ACT
    await controller.login(req, res);

    //ASSERT
    assert.strictEqual(loginStub.calledOnce, true);
    assert.strictEqual(res.status.calledOnceWith(200), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { user: USER });
  });

  it("Deve retornar erro ao tentar autenticar com email não existente", async () => {
    //ARRANGE
    const req = { body: { email: "nonexistent@example.com", password: USER.password } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    //ACT
    await controller.login(req, res);

    //ASSERT
    assert.strictEqual(res.status.calledOnceWith(404), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'User not found' });
  });
  
});