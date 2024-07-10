const { GROUP, RESPONSE, IDUSERS, mockAsync, USERS } = require("../sinonUtils");
const GroupsController = require("../../api/controllers/GroupsController");
const assert = require("assert");
const sinon = require("sinon");

describe("GroupsController", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Deve retornar uma lista de IDs de usuário com sucesso", async () => {
    const numeroDaLinha = 1;
    const findStub = sinon.stub(Group, "find").resolves([{ id_users: 1 }, { id_users: 2 }]);
    const req = { param: sinon.stub().returns(numeroDaLinha) };
    const res = { json: sinon.stub() };

    await GroupsController.findUserByAssemblyLine(req, res);

    assert.strictEqual(findStub.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], [1, 2]);
  });

  it("Deve retornar erro ao tentar obter IDs de usuário", async () => {
    const numeroDaLinha = 1;
    const errorMessage = "Internal Server Error";
    const findStub = sinon.stub(Group, "find").rejects(new Error(errorMessage));
    const req = { param: sinon.stub().returns(numeroDaLinha) };
    const res = { serverError: sinon.stub(), json: sinon.stub() };

    await GroupsController.findUserByAssemblyLine(req, res);

    assert.strictEqual(findStub.calledOnce, true);
    assert.strictEqual(res.serverError.calledOnce, true);
    assert.strictEqual(res.serverError.firstCall.args[0].message, errorMessage);
  });

  it("Deve retornar uma lista de nomes de usuários com sucesso", async () => {
    const numeroDaLinha = 1;
    const groupStub = sinon.stub(Group, "find").resolves([{ id_users: 1 }, { id_users: 2 }]);
    const userStub = sinon.stub(User, "find").resolves([{ name: "John" }, { name: "Doe" }]);
    const req = { param: sinon.stub().returns(numeroDaLinha) };
    const res = { json: sinon.stub() };

    await GroupsController.findUserByAssemblyLine2(req, res);

    assert.strictEqual(groupStub.calledOnce, true);
    assert.strictEqual(userStub.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], ["John", "Doe"]);
  });

  it("Deve retornar erro ao tentar obter nomes de usuário", async () => {
    const numeroDaLinha = 1;
    const errorMessage = "Internal Server Error";
    const groupStub = sinon.stub(Group, "find").rejects(new Error(errorMessage));
    const req = { param: sinon.stub().returns(numeroDaLinha) };
    const res = { serverError: sinon.stub(), json: sinon.stub() };

    await GroupsController.findUserByAssemblyLine2(req, res);

    assert.strictEqual(groupStub.calledOnce, true);
    assert.strictEqual(res.serverError.calledOnce, true);
    assert.strictEqual(res.serverError.firstCall.args[0].message, errorMessage);
  });

  it("Deve retornar uma lista de grupos", async () => {
    const groupsList = [GROUP];
    const findStub = sinon.stub(Group, "find").resolves(groupsList);
    const req = {};
    const res = { json: sinon.stub() };

    await GroupsController.find(req, res);

    assert.strictEqual(findStub.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], groupsList);
  });

  it("Deve retornar erro ao tentar obter grupos", async () => {
    const errorMessage = "Internal Server Error";
    const findStub = sinon.stub(Group, "find").rejects(new Error(errorMessage));
    const req = {};
    const res = { serverError: sinon.stub(), json: sinon.stub() };

    await GroupsController.find(req, res);

    assert.strictEqual(findStub.calledOnce, true);
    assert.strictEqual(res.serverError.calledOnce, true);
    assert.strictEqual(res.serverError.firstCall.args[0].message, errorMessage);
  });

  it("Deve criar um usuário com sucesso", async () => {
    
    findStub = mockAsync(GroupsController, "create", GROUP)
    req = {
      body: GROUP
    };
    const result = await GroupsController.create(req, RESPONSE);

    assert.strictEqual(findStub.calledOnce, true);
    assert.deepStrictEqual(result, GROUP);
  });

  it("Deve retornar erro ao tentar criar um grupo sem todos os campos", async () => {
    const req = { body: { assembly_line: 1 } }; // Faltando 'id_users'
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await GroupsController.create(req, res);

    assert.strictEqual(res.status.calledOnceWith(400), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'assembly_line and id_users are required' });
  });

  it("Deve retornar um grupo com sucesso", async () => {
    const groupId = 1;
    const groupData = GROUP;
    const findOneStub = sinon.stub(Group, "findOne").resolves(groupData);
    const req = { param: sinon.stub().returns(groupId) };
    const res = { json: sinon.stub() };

    await GroupsController.findOne(req, res);

    assert.strictEqual(findOneStub.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], groupData);
  });

  it("Deve retornar erro ao tentar obter um grupo inexistente", async () => {
    const groupId = 1;
    const findOneStub = sinon.stub(Group, "findOne").resolves(null);
    const req = { param: sinon.stub().returns(groupId) };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await GroupsController.findOne(req, res);

    assert.strictEqual(findOneStub.calledOnce, true);
    assert.strictEqual(res.status.calledOnceWith(404), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'Group not found' });
  });

  it("Deve atualizar uma lista de grupos com sucesso", async () => {
    const groupId = 1
    req.body = {
      assembly_line: 1, 
      id_users: 1
    }

    findStub = mockAsync(GroupsController, "update", GROUP)

    const result = await GroupsController.update(req.body, RESPONSE);

    assert.strictEqual(findStub.calledOnce, true);
    assert.deepStrictEqual(result, GROUP);
  });

  it("Deve retornar erro ao tentar atualizar um grupo inexistente", async () => {
    const groupId = 1;
    const updatedData = { assembly_line: 1, id_users: 1 };
    const updateStub = sinon.stub(Group, "updateOne").resolves(null);
    const req = { param: sinon.stub().returns(groupId), body: updatedData };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await GroupsController.update(req, res);

    assert.strictEqual(updateStub.calledOnce, true);
    assert.strictEqual(res.status.calledOnceWith(404), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'Group not found' });
  });

  it("Deve destruir um grupo com sucesso", async () => {
    const groupId = 1;
    const destroyStub = sinon.stub(Group, "destroyOne").resolves(GROUP);
    const req = { param: sinon.stub().returns(groupId) };
    const res = { json: sinon.stub() };

    await GroupsController.destroy(req, res);

    assert.strictEqual(destroyStub.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { message: 'Group deleted successfully' });
  });

  it("Deve retornar erro ao tentar destruir um grupo inexistente", async () => {
    const groupId = 1;
    const destroyStub = sinon.stub(Group, "destroyOne").resolves(null);
    const req = { param: sinon.stub().returns(groupId) };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await GroupsController.destroy(req, res);

    assert.strictEqual(destroyStub.calledOnce, true);
    assert.strictEqual(res.status.calledOnceWith(404), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'Group not found' });
  });
});
