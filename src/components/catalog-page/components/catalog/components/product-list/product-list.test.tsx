import { render } from '@testing-library/react';
import { Router} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ProductList from './product-list';
import { mockGuitar } from '../../../../../../mock/mock-guitar';

const history = createMemoryHistory();

describe('Component: ProductList', () => {
  it('should render ProductList correctly', () => {
    const {container} = render(
      <Router history={history}>
        <ProductList guitars={mockGuitar} guitarCount={9}/>
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });
});
