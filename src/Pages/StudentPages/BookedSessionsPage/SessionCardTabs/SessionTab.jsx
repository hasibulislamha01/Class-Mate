import PropTypes from "prop-types";
import Info from "../../../../Components/UI/TabCard/Info";
import useFormateDate from "../../../../CustomHooks/useFormateDate";

const SessionTab = ({ session }) => {
    const classEnds = useFormateDate(session?.classEnds)
    return (
        <section className="grid grid-cols-2 gap-x-8 gap-y-5">
            <Info
                itemName='Enrolled at'
                itemValue={session?.enrolledDate || '12 December, 2024'}
            />
            <Info
                itemName='Cost'
                itemValue={session?.registrationFee || '100'}
                unit='$'
            />
            <Info
                itemName='Class Ends at'
                itemValue={classEnds || '12 December, 2024'}
            />
            <Info
                itemName='Duration'
                itemValue={session?.duration || '100'}
                unit={'hours'}
            />
        </section>
    );
};

SessionTab.propTypes = {
    session: PropTypes.object
}
export default SessionTab;