import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner'; 
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); 

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true); 
      try {
        const data = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=6`); 
        const response = await data.json();
        
        if (response.length > 0) {
          setImages(response); 
        } else {
          setHasMore(false); 
        }
      } catch (error) {
        console.error('Error fetching the images:', error);
      }
      setLoading(false); // Hide loader
    };
    fetchImages();
  }, [page]);


  const nextPage = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };


  const prevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <div className="bg-container">
        <div className="container img-main-container">
          <div className="header-container d-flex align-items-center">
            <h5 className="logo">Logo</h5>
            <h5 className="title">Site Title</h5>
          </div>
          <hr className="hr-line" />
          <div className="img-header-container d-flex justify-content-center align-items-center">
            <h4 className="main-heading">Header Image</h4>
          </div>
          <hr className="hr-line" />

          <div className="img-container">
            {loading ? (
              <div className="d-flex justify-content-center">
                <TailSpin
                  height="80"
                  width="80"
                  color="blue"
                  ariaLabel="loading"
                />
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-8 mb-4">
                  {images[0] ? (
                    <img src={images[0].download_url} alt="img" className="img-fluid h-100" loading="lazy"/>
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
                <div className="col-lg-4">
                  <div className="mb-2">
                    {images[1] ? (
                      <img src={images[1].download_url} alt="img" className="img-fluid h-100" loading="lazy"/>
                    ) : (
                      <p>No image available</p>
                    )}
                  </div>
                  <div className="mt-3">
                    {images[2] ? (
                      <img src={images[2].download_url} alt="img" className="img-fluid" loading="lazy"/>
                    ) : (
                      <p>No image available</p>
                    )}
                  </div>
                </div>
              </div>
            )}

    
            <div className="col-lg-12 col-md-12 mb-4 mt-4">
              <div className="row">
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <TailSpin
                      height="80"
                      width="80"
                      color="blue"
                      ariaLabel="loading"
                    />
                  </div>
                ) : (
                  images.map((image) => (
                    <div className="col-lg-6 col-md-6 mb-4" key={image.id}>
                      <img src={image.download_url} alt={image.author} className="img-fluid" loading="lazy"/>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="text-center mt-4">
              <button
                className="btn btn-primary me-2"
                onClick={prevPage}
                disabled={page === 1 || loading}
              >
                Previous
              </button>
              <button
                className="btn btn-primary"
                onClick={nextPage}
                disabled={!hasMore || loading}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
