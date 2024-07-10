const assert = require("assert");
const controller = require("../../api/controllers/TasksController");
const { mockAsync, RESPONSE, TASK } = require("../sinonUtils");
const sinon = require("sinon");

describe("TaskController", () => {
  afterEach(() => {
    // Restaurar os métodos originais após cada teste
    sinon.restore();
  });

  const mockRes = () => {
    const res = {};
    res.json = sinon.stub().returns(res);
    res.status = sinon.stub().returns(res);
    res.serverError = sinon.stub().returns(res);
    res.notFound = sinon.stub().returns(res);
    return res;
  };

  it("Deve retornar todas as tarefas", async () => {
    // Arrange
    const findStub = mockAsync(Task, "find", [TASK]);
    const res = mockRes();
    // Act
    const result = await controller.find({}, res);
    // Assert
    assert.strictEqual(findStub.calledOnce, true);
    assert.strictEqual(res.json.calledOnceWithExactly([TASK]), true);
  });

  it("Deve criar uma nova tarefa", async () => {
    // Arrange
    const createStub = mockAsync(Task, "create", TASK);
    const req = { body: TASK };
    const res = mockRes();
    // Act
    const result = await controller.create(req, res);
    // Assert
    assert.strictEqual(createStub.calledOnce, true);
    assert.strictEqual(res.status.calledOnceWithExactly(201), true);
    assert.strictEqual(res.json.calledOnceWithExactly(TASK), true);
  });

  it("Deve retornar uma tarefa específica", async () => {
    // Arrange
    const taskId = 1;
    const findOneStub = mockAsync(Gun, "findOne", TASK);
    const req = { param: () => taskId };
    const res = mockRes();
    // Act
    const result = await controller.findOne(req, res);
    // Assert
    assert.strictEqual(findOneStub.calledOnce, true);
    assert.strictEqual(res.json.calledOnceWithExactly(TASK), true);
  });

 // Continuação dos testes do TaskController

 it("Deve atualizar uma tarefa existente", async () => {
    // Arrange
    const taskId = 1;
    const updateStub = mockAsync(Task, "updateOne", TASK);
    const req = { param: () => taskId, body: TASK };
    const res = mockRes();
    // Act
    const result = await controller.update(req, res);
    // Assert
    assert.strictEqual(updateStub.calledOnce, true);
    assert.strictEqual(res.json.calledOnceWithExactly(TASK), true);
  });

  it("Deve remover uma tarefa existente", async () => {
    // Arrange
    const taskId = 1;
    const destroyStub = mockAsync(Task, "destroyOne", TASK);
    const req = { param: () => taskId };
    const res = mockRes();
    // Act
    const result = await controller.destroy(req, res);
    // Assert
    assert.strictEqual(destroyStub.calledOnce, true);
    assert.strictEqual(res.json.calledOnceWithExactly(TASK), true);
  });

  it("Deve filtrar imagens dos manuais", async () => {
    // Arrange
    const idsManuais = [1, 2, 3];
    const req = { param: () => idsManuais };
    const mockMaterials = [
      { id_handbooks: 1, type: "Imagem" },
      { id_handbooks: 2, type: "Texto" },
      { id_handbooks: 3, type: "Imagem" },
    ];
    const mockHandbooks = [{ id: 1 }, { id: 3 }];
    const findMaterialsStub = sinon.stub(Material, "find").resolves(mockMaterials);
    const findHandbooksStub = sinon.stub(Handbook, "find").resolves(mockHandbooks);
    const res = mockRes();
    // Act
    const result = await controller.filterImagem(req, res);
    // Assert
    assert.strictEqual(findMaterialsStub.calledOnceWithExactly({ id_handbooks: idsManuais }), true);
    assert.strictEqual(findHandbooksStub.calledOnceWithExactly({ id: [1, 3] }), true);
    assert.strictEqual(res.json.calledOnceWithExactly(mockHandbooks), true);
  });

  // Testes adicionais para findUndoneTask e findDoneTask, se necessário
});
