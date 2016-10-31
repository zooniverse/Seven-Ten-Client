import TextSplit from '../src/text-split';

describe('<TextSplit />', () => {
  const textSplit = (props = { }) => {
    props.splitKey = props.splitKey || 'test';
    props.textKey = props.textKey || 'example';
    return(
      shallow(<TextSplit {...props } />)
    );
  };

  context('creating the element', () => {
    it('should default to a span element', () => {
      const wrapper = textSplit();
      expect(wrapper.node.type).to.equal('span');
    });

    it('should accept a custom type', () => {
      const wrapper = textSplit({ elementType: 'h1' });
      expect(wrapper.node.type).to.equal('h1');
    });
  });

  context('without a split', () => {
    it('should render the default', () => {
      const wrapper = textSplit({ default: 'works'});
      expect(wrapper.text()).to.equal('works');
    });
  });

  context('with splits', () => {
    context('without the specified split key', () => {
      const splits = {
        other: {
          variant: {
            value: {
              unrelated: 'something else'
            }
          }
        }
      };

      it('should render the default', () => {
        const wrapper = textSplit({ default: 'works', splits });
        expect(wrapper.text()).to.equal('works');
      });
    });

    context('with the specified split', () => {
      const splits = {
        test: {
          variant: {
            value: {
              example: 'split text'
            }
          }
        }
      };

      context('without the specified text key', () => {
        it('should render the default', () => {
          const wrapper = textSplit({ default: 'works', textKey: 'unrelated', splits });
          expect(wrapper.text()).to.equal('works');
        });
      });

      context('with the specified text key', () => {
        it('should render the variant text', () => {
          const wrapper = textSplit({ default: 'works', splits });
          expect(wrapper.text()).to.equal('split text');
        });
      });
    });
  });
});
