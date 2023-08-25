import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLimit } from "../../store/actions";
import { Sliders, MapCreatePost, AsideUser} from "../../components";
import icons from "../../utilities/icons"

const { AiTwotoneStar, CiLocationOn, RiCrop2Line, TbReportMoney, GoClock, BiHash, GoDotFill} = icons;

const DetailPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const {post} = useSelector(state => state.post)

  // api
  useEffect(() => {
    postId && dispatch(getPostsLimit({ id: postId }));
  }, [postId]);

  // post
  const posts = post[0]
  console.log(posts)
  // star
  const star = +posts?.star
  let stars = [];
  for (let i = 0; i < star; ++i) {
  stars.push(<AiTwotoneStar key={i} style={{ color: "yellow", fontSize: "2.1rem" }} />);
  }

  const description = posts?.description && posts.description

  return (
    <div className="detail-post row">
      <article className="detail-post__list">
          <Sliders postImage={post[0]?.images?.image} userName={post[0]?.user?.userName}/>

          {/*  */}
          <section className="detail-post__preview">
              <h1 className="ellipsis">{stars} {`${posts?.title}`}</h1>
             <div className="detail-post__area row">
                <strong>Chuyên mục: </strong>
                <span className="ellipsis detail-post__area--cursor">{posts?.overviews?.area}</span>
             </div>
            <div className="detail-post__address row">
                <strong><CiLocationOn/></strong>
                <strong>Địa chỉ: </strong>
                <span className="ellipsis">{posts?.address}</span>
             </div>

            <div className="detail-post__parameter row">
              <strong className="detail-post__parameter--price row">
                <TbReportMoney/>
                {posts?.attribute?.price}
              </strong>
              <strong className="detail-post__parameter--m2 row">
                  <RiCrop2Line/>
                  {posts?.attribute?.acreage}
              </strong>
              <strong className="detail-post__parameter--time row">
                  <GoClock/>
                  {posts?.attribute?.published}
              </strong>
              <strong className="detail-post__parameter--hashtag row">
                  <BiHash/>
                  {posts?.attribute?.hashtag}
              </strong>
            </div>

            <div className="detail-post__info">
              <h3>Thông tin mô tả.</h3>
              <div className="detail-post__info--content row">
                {typeof description === "string"
                ? <span>{JSON.parse(posts?.description)}</span>
                : typeof description === "object" ? JSON.parse(description).map((item, index) => {
                  return (
                    <span key={index} >{item}</span>
                  )
                })
                : ""}
              </div>
            </div>

            <div className="detail-post__character--post">
              <h3>Đặc điểm tin đăng</h3>

                <div className="element-box hihi row">
                  <strong>Mã tin:</strong>
                  <p className="row"><BiHash/>{posts?.attribute?.hashtag}</p>
                </div>
                <div className="element-box row">
                  <strong>Khu vực:</strong>
                  <p className="row">{posts?.overviews?.area}</p>
                </div>
                <div className="element-box hihi row">
                  <strong>Loại tin rao:</strong>
                  <p className="row">{posts?.overviews?.type}</p>
                </div>
                <div className="element-box row">
                  <strong>Đối tượng thuê:</strong>
                  <p className="row">{posts?.overviews?.target}</p>
                </div>
                <div className="element-box hihi row">
                  <strong>Gói tin:</strong>
                  <p className="row">{posts?.overviews?.bonus}</p>
                </div>
                <div className="element-box row">
                  <strong>Ngày đăng:</strong>
                  <p className="row">{posts?.overviews?.created}</p>
                </div>
                <div className="element-box hihi row">
                  <strong>Ngày hết hạn:</strong>
                  <p className="row">{posts?.overviews?.expire}</p>
                </div>
            </div>

            <div className="detail-post__user">
             <h3>Thông tin liên hệ</h3>
               <div className="element-box hihi row">
                  <strong>Liên hệ:</strong>
                  <p className="row">{posts?.user?.userName}</p>
                </div>
                <div className="element-box row">
                  <strong>Điện thoại:</strong>
                  <p className="row">{posts?.user?.phone}</p>
                </div>
                <div className="element-box hihi row">
                  <strong>Zalo:</strong>
                  <p className="row">{posts?.user?.zalo || "Hiện chưa có"}</p>
                </div>
            </div>

            <div className="detail-post__map">
              <h3>Bản đồ</h3>
              <MapCreatePost detail/>
            </div>
            
          </section>

      </article>

      {/* aside */}
      <aside className="aside">
        <AsideUser posts={posts}/>
      </aside>
    </div>
  )
};

export default DetailPost;
