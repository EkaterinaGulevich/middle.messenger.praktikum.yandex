import chai, { expect } from 'chai';
import spies from 'chai-spies';

chai.use(spies);

import { Component } from 'src/modules';

type CheckComponentState = { name: string; age: number };

const INITIAL_STATE: CheckComponentState = {
  age: 20,
  name: 'Vasya',
};

const TEMPLATE = 'hbs template';
class CheckComponent extends Component<CheckComponentState> {
  constructor() {
    super(INITIAL_STATE);
  }

  render() {
    return TEMPLATE;
  }
}

describe('Test Component', () => {
  const comp = new CheckComponent();
  comp.dispatchComponentDidMount();

  const sandbox = chai.spy.sandbox();

  beforeEach(() => {
    sandbox.on(comp, [
      'componentDidMount',
      'componentDidUpdate',
      'registerEvents',
      'componentUnmount',
      'shouldComponentUpdate',
    ]);
  });

  afterEach(() => {
    sandbox.restore(comp);
  });

  it('Initial state is correct', () => {
    expect(comp.state).to.eql({
      age: 20,
      name: 'Vasya',
    });
  });

  it('On event dispatchComponentDidMount should be called method componentDidMount and registerEvents', () => {
    comp.dispatchComponentDidMount();

    expect(comp.componentDidMount).to.have.been.called();
    expect(comp.registerEvents).to.have.been.called();

    expect(comp.shouldComponentUpdate).to.have.been.not.called();
    expect(comp.componentDidUpdate).to.have.been.not.called();
  });

  it('Call setState should change state', () => {
    comp.setState({ age: 21 });

    expect(comp.state).to.eql({
      age: 21,
      name: 'Vasya',
    });
  });

  it('On event dispatchComponentDidUpdate should be called method componentDidUpdate and registerEvents', () => {
    comp.dispatchComponentDidUpdate();

    expect(comp.componentDidUpdate).to.have.been.called();
    expect(comp.registerEvents).to.have.been.called();

    expect(comp.componentDidMount).to.have.been.not.called();
  });

  it('on event Component.EVENTS.FLOW_CU should be called method componentUnmount', () => {
    comp.eventBus.emit(Component.EVENTS.FLOW_CU);
    expect(comp.componentUnmount).to.have.been.called();
  });
});
