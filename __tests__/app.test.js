import request from 'supertest';
import matchers from 'jest-supertest-matchers';
import faker from 'faker';

import app from '..';
import {
  lesson, student, teacher, lessonStudent, lessonTeacher,
} from '../models';

const testUser = id => ({
  id,
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  password: faker.internet.password(),
  userAgent: faker.internet.userAgent(),
});

const testTask = id => ({
  id,
  name: faker.random.word(),
  description: faker.random.words(11),
});

let server;
let userId = 0;
let taskId = 0;
let superagent;
let user;
let task;

beforeAll(async () => {
  expect.extend(matchers);
  server = app().listen();
});

afterAll((done) => {
  userId = 0;
  taskId = 0;
  server.close();
  done();
});

describe('Lessons Filtration', () => {
  beforeAll(async () => {
    superagent = request.agent(server);
  });

  it('Filter: "My Tasks"', async () => {
    await superagent
      .set('Connection', 'keep-alive')
      .set('content-type', 'application/x-www-form-urlencoded');
    const response = await superagent
      .get('/')
      .set('Connection', 'keep-alive');
    expect(response).toHaveHTTPStatus(200);
    expect(response.text.includes(`${task1.name}`)).toBeTruthy();
    expect(response.text.includes(`${task2.name}`)).toBeTruthy();
    expect(response.text.includes(`${task3.name}`)).toBeFalsy();
  });

  it('Filter: "Assigned to me"', async () => {
    await superagent
      .post('/sessions')
      .type('form')
      .send({
        form: {
          email: user1.email,
          password: user1.password,
        },
      })
      .set('Connection', 'keep-alive')
      .set('user-agent', user1.userAgent)
      .set('content-type', 'application/x-www-form-urlencoded');
    const response = await superagent
      .get(`/tasks?assignedToId=${user1.id}`)
      .set('user-agent', user1.userAgent)
      .set('x-test-auth-token', user1.email)
      .set('Connection', 'keep-alive');
    expect(response).toHaveHTTPStatus(200);
    expect(response.text.includes(`${task1.name}`)).toBeTruthy();
    expect(response.text.includes(`${task2.name}`)).toBeFalsy();
    expect(response.text.includes(`${task3.name}`)).toBeFalsy();
  });

  it('Filter: by status', async () => {
    await superagent
      .post('/sessions')
      .type('form')
      .send({
        form: {
          email: user2.email,
          password: user2.password,
        },
      })
      .set('Connection', 'keep-alive')
      .set('user-agent', user2.userAgent)
      .set('content-type', 'application/x-www-form-urlencoded');
    const response = await superagent
      .get('/tasks?StatusId=2&assignedToId=All')
      .set('user-agent', user2.userAgent)
      .set('x-test-auth-token', user2.email)
      .set('Connection', 'keep-alive');
    expect(response).toHaveHTTPStatus(200);
    expect(response.text.includes(`${task1.name}`)).toBeFalsy();
    expect(response.text.includes(`${task2.name}`)).toBeFalsy();
    expect(response.text.includes(`${task3.name}`)).toBeTruthy();
  });

  it('Filter: by assignee', async () => {
    await superagent
      .post('/sessions')
      .type('form')
      .send({
        form: {
          email: user2.email,
          password: user2.password,
        },
      })
      .set('Connection', 'keep-alive')
      .set('user-agent', user2.userAgent)
      .set('content-type', 'application/x-www-form-urlencoded');
    const response = await superagent
      .get(`/tasks?StatusId=All&assignedToId=${user2.id}`)
      .set('user-agent', user2.userAgent)
      .set('x-test-auth-token', user2.email)
      .set('Connection', 'keep-alive');
    expect(response).toHaveHTTPStatus(200);
    expect(response.text.includes(`${task1.name}`)).toBeFalsy();
    expect(response.text.includes(`${task2.name}`)).toBeTruthy();
    expect(response.text.includes(`${task3.name}`)).toBeTruthy();
  });

  it('Filter all', async () => {
    await superagent
      .post('/sessions')
      .type('form')
      .send({
        form: {
          email: user1.email,
          password: user1.password,
        },
      })
      .set('Connection', 'keep-alive')
      .set('user-agent', user1.userAgent)
      .set('content-type', 'application/x-www-form-urlencoded');
    const response = await superagent
      .get('/tasks?StatusId=All&assignedToId=All')
      .set('user-agent', user1.userAgent)
      .set('x-test-auth-token', user1.email)
      .set('Connection', 'keep-alive');
    expect(response).toHaveHTTPStatus(200);
    expect(response.text.includes(`${task1.name}`)).toBeTruthy();
    expect(response.text.includes(`${task2.name}`)).toBeTruthy();
    expect(response.text.includes(`${task3.name}`)).toBeTruthy();
    await User.sync({ force: true });
    await Task.sync({ force: true });
  });

  afterAll((done) => {
    server.close();
    done();
  });
});
