import React, { useState, useContext } from 'react'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import AmazonRepricingTable from './Table/AmazonRepricingTable'
import Amazonrepricing from '../../style/Actions/Amazonrepricing.module.css'
import { RepricingLogs } from './Table/RepricingLogs'
import { DataContext } from '../../context/DataProvider'

const AmazonRepricing = () => {
    const [showRepricingLog, setShowRepricingLog] = useState(true)
    const { sidenavbar } = useContext(DataContext)
    const RepricingLog_Handle = () => {
        setShowRepricingLog(!showRepricingLog)
    }

    const AmazonRepricing_Handle = () => {
        setShowRepricingLog(!showRepricingLog)
    }

    let rendertable;
    if (sidenavbar) {
        rendertable = <>
            <div>
                <div className={Amazonrepricing.backgroundcontainer}>
                    <div className='headingbaronaction'>
                        <div className='toptableheading'>
                            <div className='subtoptableheadingone'>
                                <div>Amazon Repricing</div>
                            </div>
                            <div className='subtoptableheadingone'>
                                <span>Actions</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Amazon Repricing</span>
                            </div>
                        </div>
                    </div>

                    <div className={Amazonrepricing.Amazonrepricingtopbuttons}>
                        <div>{showRepricingLog ? <div className={Amazonrepricing.buttonone}>Amazon Repricing</div> : <div lassName={Amazonrepricing.buttontwo} onClick={RepricingLog_Handle}>Amazon Repricing</div>}</div>
                        <div>{showRepricingLog ? <div className={Amazonrepricing.buttontwo}  onClick={RepricingLog_Handle}>Repricing Logs</div> : <div className={Amazonrepricing.buttonone} >Repricing Logs</div>}</div>
                    </div>

                    {
                        showRepricingLog ? <AmazonRepricingTable /> : <RepricingLogs />
                    }

                </div>

            </div>

        </>
    } else {
        rendertable = <>
            <div>
                <div className={Amazonrepricing.backgroundcontainer2}>
                    <div className='headingbaronaction2'>
                        <div className='toptableheading'>
                            <div className='subtoptableheadingone'>
                                <div>Amazon Repricing</div>
                            </div>
                            <div className='subtoptableheadingone'>
                                <span>Actions</span> <span><MdOutlineArrowForwardIos /></span><span className='subMenu_subheading'>Amazon Repricing</span>
                            </div>
                        </div>
                    </div>
                    <div className={Amazonrepricing.Amazonrepricingtopbuttons}>
                        <div className={Amazonrepricing.buttonone} onClick={AmazonRepricing_Handle}>Amazon Repricing</div>
                        <div className={Amazonrepricing.buttontwo} onClick={RepricingLog_Handle}>Repricing Logs</div>
                    </div>
                    {
                        showRepricingLog ? <AmazonRepricingTable /> : <RepricingLogs />
                    }

                </div>

            </div>

        </>
    }

    return (
        <>
            {rendertable}
        </>
    )
}

export default AmazonRepricing
