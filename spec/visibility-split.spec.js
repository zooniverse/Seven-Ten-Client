import VisibilitySplit from '../lib/visibility-split';

describe('<VisibilitySplit />', () => {
  const visibilitySplit = (props = { }) => {
    props.splitKey = props.splitKey || 'test';
    props.elementKey = props.elementKey || 'example';
    return(shallow(
      <VisibilitySplit {...props }>
        <p>children</p>
      </VisibilitySplit>
    ));
  };

  context('without a split', () => {
    it('should render the children', () => {
      const wrapper = visibilitySplit();
      expect(wrapper.text()).to.equal('children');
    });
  });


  context('with splits', () => {
    context('without the specified split key', () => {
      const splits = {
        other: {
          variant: {
            value: {
              unrelated: false
            }
          }
        }
      };

      it('should render the children', () => {
        const wrapper = visibilitySplit({ splits });
        expect(wrapper.text()).to.equal('children');
      });
    });

    context('with the specified split', () => {
      const splits = {
        test: {
          variant: {
            value: {
              test1: true,
              test2: false
            }
          }
        }
      };

      context('without the specified element key', () => {
        it('should render the children', () => {
          const wrapper = visibilitySplit({ elementKey: 'unrelated', splits });
          expect(wrapper.text()).to.equal('children');
        });
      });

      context('with the specified element key', () => {
        context('when the element is visible', () => {
          it('should render the children', () => {
            const wrapper = visibilitySplit({ elementKey: 'test1', splits });
            expect(wrapper.text()).to.equal('children');
          });
        });

        context('when the element is not visible', () => {
          it('should not render the children', () => {
            const wrapper = visibilitySplit({ elementKey: 'test2', splits });
            expect(wrapper.children().isEmpty()).to.equal(true);
          });
        });
      });
    });
  });
});
